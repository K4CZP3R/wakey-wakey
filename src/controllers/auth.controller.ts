import { TOKEN_INSTANCE } from "../consts";
import { DependencyProviderService } from "../helpers/dependency-injection";
import { TokenHelper } from "../helpers/token.helper";
import { authMiddleware } from "../middlewares/auth.middleware";
import { RouteData } from "../models/route-function.type";
import { UserRepo } from "../repos/user.repo";
import { BaseController } from "./base.controller";
import { z } from "zod";

export class AuthController extends BaseController {
  private userRepo: UserRepo;
  private tokenHelper: TokenHelper;

  constructor() {
    super("/auth");

    this.initialize(
      [
        {
          path: "/",
          method: "get",
          func: this.meRoute.bind(this),
          middlewares: [authMiddleware],
        },
        {
          path: "/register",
          method: "post",
          func: this.registerRoute.bind(this),
        },
        {
          path: "/login",
          method: "post",
          func: this.loginRoute.bind(this),
        },
      ],
      []
    );

    this.userRepo = new UserRepo();
    this.tokenHelper = DependencyProviderService.getImpl(TOKEN_INSTANCE);
  }

  async meRoute(data: RouteData): Promise<any> {
    return {
      session: data.session,
    };
  }

  async loginRoute(data: RouteData): Promise<any> {
    const userInput = z
      .object({
        email: z.string().email(),
        password: z.string().min(8),
      })
      .parse(data.body);

    const user = await this.userRepo.getUserByEmail(userInput.email);
    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordCorrect = await Bun.password.verify(
      userInput.password,
      user.passwordHash
    );

    if (!isPasswordCorrect) {
      throw new Error("Password/Email combination is incorrect");
    }

    return { token: this.tokenHelper.createTokenFor(user) };
  }

  async registerRoute(data: RouteData): Promise<any> {
    const userInput = z
      .object({
        email: z.string().email(),
        password: z.string().min(8),
        name: z.string(),
      })
      .parse(data.body);

    const user = await this.userRepo.createUser(
      userInput.email,
      await Bun.password.hash(userInput.password),
      userInput.name
    );

    return {
      user: user,
    };
  }
}
