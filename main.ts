import {App, MarkdownView, Plugin, PluginSettingTab} from "obsidian";
// @ts-ignore
import {Remarkable} from "remarkable";
// @ts-ignore
import toc from "markdown-toc"

export default class MarkdownToc extends Plugin {

    onInit() {
    }

    async onload() {
        console.log("Loading markdown-toc");

        this.addCommand({
            id: "markdown-toc",
            name: "Generate table of contents",
            callback: () => this.generateTableOfContents(),
            hotkeys: [
                {
                    modifiers: ["Mod", "Alt"],
                    key: "t",
                },
            ],
        });
    }

    onunload() {
        console.log("Unload markdown-toc");
    }

    generateTableOfContents() {
        const view = this.app.workspace.activeLeaf.view;
        if (view instanceof MarkdownView) {
            // Do work here
            const editor = view.sourceMode.cmEditor;
            const tableOfContents = this.prettify(editor.getValue());
            editor.replaceSelection(tableOfContents, "start");
        }
    }

    prettify(text: String): string {
        return new Remarkable()
            .use(toc.plugin()) // <= register the plugin
            .render(text);
    }
}

