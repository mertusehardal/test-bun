import { Elysia } from "elysia";
import prisma from './db'
import { formatParams } from "./helpers";

const app = new Elysia().get("/mp/:containerID", async (request) => {
  try{
    const {params : { containerID }, query } = request;
    const targetContainer = await prisma.container.findUnique({
      where: {
        id: containerID
      }
    }) as any

    if (!targetContainer) {
      throw new Error("Container Not Found")
    }
    // Set your measurement_id and api_secret
    const measurement_id = targetContainer.settings?.measurementId;
    const api_secret = targetContainer.settings?.measurementApiSecret;
    const sgtm_preview = targetContainer.settings?.measurementPreviewUrl;
    const custom_domain = targetContainer.settings.customDomainSGTMContainer || 'www.google-analytics.com';

    // Get queries
    const client_id = query['client_id'];
    const eventName = query['event_name'];
    const parameters = query['params'] as string;
    const paramsJSON = formatParams(parameters.split("-"))

    //const response = await postAnalytics(custom_domain, measurement_id, api_secret, sgtm_preview, client_id, eventName, paramsObj)
    console.log(paramsJSON)
    return new Response(JSON.stringify({data: paramsJSON}),{status:200})  
  }catch(err){
    console.log(err)
    return new Response(JSON.stringify({data: err instanceof Error ? err.message:err}),{status:500})  
  }
}).listen(process.env.PORT ?? 3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
