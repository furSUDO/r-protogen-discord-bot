import { BaseMessageComponent } from "../base";
import { Custom } from "./custom";

import { MarketplaceApply } from "./marketplaceApply";
import { MarketplaceShowForm } from "./marketplaceShowForm";

export const ButtonComponents: Array<BaseMessageComponent> = [
    // @ts-ignore
    new MarketplaceApply,
    new Custom,
    new MarketplaceShowForm
]