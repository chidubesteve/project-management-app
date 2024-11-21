module.exports = {
  apps: [
    {
      name: "ProjectPulse",
      script: "npm",
      args: "run dev",
      env: {
        NODE_ENV: "development",
      },
    },
  ],
};
