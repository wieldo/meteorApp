import templateUrl from "./view";
import {ChatPostChannelComponent} from "./channel";
import {ChatPostDirectComponent} from "./direct";
import {name} from "./../../module";
import {
    init,
    SetModule,
    Component,
    LocalInjectables
} from "angular2-now";
init();
SetModule(name);
@Component({
    selector: "chat-post",
    bind: {
        onMessage: "&"
    },
    templateUrl: templateUrl,
    providers: ["$element", "$q", "$scope"]
})
@LocalInjectables
class ChatPostComponent {
    constructor() {
        this.message = "";

        // catch every keydown on textarea
        this.$element.find("#chat-post-message").bind("keydown", (event) => {
            const code = event.keyCode || event.which;

            if (code === 13) {
                // pass only `enter`
                if (!event.shiftKey) {
                    event.preventDefault();
                    // trigger sending
                    this.$scope.$apply(() => {
                        this.send();
                    });
                }
            }
        });
    }

    send() {
        if (typeof this.message === "string" && this.message.trim().length) {
            this.onMessage({
                message: this.message
            });

            this.reset();
        }
    }

    reset() {
        this.message = "";
    }
}

export default {
    ChatPostComponent,
    ChatPostChannelComponent,
    ChatPostDirectComponent
};
