import { EnvType, load } from 'ts-dotenv';

export type Env = EnvType<typeof schema>;

export const schema = {
    DISCORD_APPLICATION_TOKEN: String,
    DISCORD_CLIENT_TOKEN: String,

    GUILD_ID: String,
    GUILD_LOGGING_CHANNEL_ID: String,

    THREAD_MPAQ_ID: String,
    TRHEAD_URQ_ID: String,
    TRHEAD_MML_ID: String,

    MARKETPLACE_INFO_CHANNEL_ID: String,
    MARKETPLACE_VERIFIED_ROLE_ID: String
};

export let env: Env;

export function loadEnv(): void {
    env = load(schema);
}