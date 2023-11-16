export type RouteFunction = (data: RouteData) => Promise<any>;

export type RouteData = {
  query: { [key: string]: string };
  params: { [key: string]: string };
  body: { [key: string]: string };
  session: { [key: string]: string };
};
