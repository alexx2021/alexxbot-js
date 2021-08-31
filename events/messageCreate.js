module.exports = {
    name: 'messageCreate',
    execute(message) {
        function clean(text) {
            if (typeof (text) === "string")
                return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
            else
                return text;
        }


        const args = message.content.split(" ").slice(1);

        if (message.content.startsWith("!eval")) {
            if (message.author.id !== "247932598599417866") return;
            try {
                const code = args.join(" ");
                let evaled = eval(code);

                if (typeof evaled !== "string")
                    evaled = require("util").inspect(evaled);

                message.channel.send((evaled), { code: "xl" });
            } catch (err) {
                message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
            }
        }
    },
};

