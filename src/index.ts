import "dotenv/config";
import "dotenv/config";
import { serve } from "@hono/node-server";
import { allRoutes } from "./routes/routes";
import { Hono } from "hono";

serve(allRoutes, (info) => {
  console.log(`server is running on port ${info.port}`);
});


//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhdGNodXRoYTU3QGdtYWlsLmNvbSIsInN1YiI6ImNtOHBzdXJjazAwMDB2djN3a2ptaGVlNzkiLCJ1c2VybmFtZSI6Ik1TRCIsImlhdCI6MTc0Mjk4NTk4NywiZXhwIjoxNzQ1NTc3OTg3fQ.ljl0pe5QeTEGotJv3uwJD3RnTmBhhyqy_ik5J4501OQ