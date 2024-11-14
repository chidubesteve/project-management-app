module.exports = {
  apps: [
    {
      name: "ENSG PROJECT METER",
      script: "npm",
      args: "run dev",
      env: {
        NODE_ENV: "development",
      },
    },
  ],
};
