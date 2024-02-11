import { BaseMessageComponent } from "./base";

import { ButtonComponents } from "./buttons";
import { SelectMenus } from "./selectMenus";

export const MessageComponents: Array<BaseMessageComponent> = [
    ...ButtonComponents,
    ...SelectMenus
]