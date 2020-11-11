import {App, MarkdownView, Plugin, PluginSettingTab} from "obsidian";
// @ts-ignore
import Remarkable from "remarkable";
// @ts-ignore
import toc from "./markdown-toc"

export default class MarkdownToc extends Plugin {

    onInit() {
    }

    async onload() {
        console.log("Loading markdown-toc");

        let text = '# AAA\n# BBB\n# CCC\nfoo\nbar\nbaz'
        let results = new Remarkable()
            .use(toc.plugin()) // <= register the plugin
            .render(text)
        console.log(results.content)


        this.addCommand({
            id: "markdown-toc",
            name: "Generate",
            callback: () => this.generateTableOfContents(),
            hotkeys: [
                {
                    modifiers: ["Mod", "Shift"],
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

            const text = editor.getValue()
            editor.replaceSelection(this.generateTOC(text), "start");
        }
    }

    generateTOC(text: String): string {
        let results = new Remarkable()
            .use(toc.plugin()) // <= register the plugin
            .render(text)
        return results.content
    }
}

