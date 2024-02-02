module.exports = {
    apps: [{
        name: "r/protogen management",
        script: "./dist/index.js",
        restart_delay: 30000,
        autorestart: true,
    }]
}