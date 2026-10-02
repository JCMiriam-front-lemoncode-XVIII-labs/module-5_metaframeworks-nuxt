import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { houses } from "./mock-data";

const app = new Hono();

app.use("/*", serveStatic({ root: "./public" }));
app.use(logger());
app.use("/api/*", cors());

app.get("/api/houses", (context) => context.json(houses));

app.get("/api/houses/:id", (context) => {
  const house = houses.find(({ id }) => id === context.req.param("id"));

  return house
    ? context.json(house)
    : context.json({ message: "House not found" }, 404);
});

serve({ fetch: app.fetch, port: 3001 }, ({ port }) => {
  console.log(`API running on ${port}`);
});
