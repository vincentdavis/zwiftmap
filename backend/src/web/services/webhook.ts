import {
  STRAVA_CLIENT_ID,
  STRAVA_VERIFY_TOKEN,
  STRAVA_WEBHOOK_HOST,
} from "../../shared/config";
import { stravaAppAPI } from "../../shared/services/strava";

interface WebhookSubscription {
  id: number;
  resource_state: number;
  application_id: number;
  callback_url: string;
  created_at: string;
  updated_at: string;
}

const CALLBACK_URL = `${STRAVA_WEBHOOK_HOST}/strava/webhook`;

export async function setupWebhook() {
  const subscription = await getWebhookSubscription();

  if (!subscription) {
    await createWebhookSubscription();
    return;
  }

  if (
    subscription.callback_url === CALLBACK_URL &&
    subscription.application_id === STRAVA_CLIENT_ID
  ) {
    console.log("Webhook already created");
    return;
  }

  await deleteWebhookSubscription(subscription);
  await createWebhookSubscription();
}

async function createWebhookSubscription() {
  console.log("Creating Webhook Subscription");

  try {
    await stravaAppAPI.post("/api/v3/push_subscriptions", {
      callback_url: `${STRAVA_WEBHOOK_HOST}/strava/webhook`,
      verify_token: STRAVA_VERIFY_TOKEN,
    });
  } catch (e: any) {
    console.error("Error creating Webhook Subscription", e);
  }
}

async function getWebhookSubscription(): Promise<
  WebhookSubscription | undefined
> {
  console.log("Fetching Webhook Subscription");

  try {
    const response = await stravaAppAPI.get<WebhookSubscription[]>(
      "/api/v3/push_subscriptions"
    );
    return response.data[0];
  } catch (e: any) {
    console.error("Error fetching Webhook Subscription", e);
    return undefined;
  }
}

async function deleteWebhookSubscription(subscription: WebhookSubscription) {
  console.log("Deleting Webhook Subscription");

  try {
    await stravaAppAPI.delete(`/api/v3/push_subscriptions/${subscription.id}`);
  } catch (e: any) {
    console.error("Error deleting Webhook Subscription", e);
  }
}
