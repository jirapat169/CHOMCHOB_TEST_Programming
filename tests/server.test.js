import { expect } from "chai";
import server from "../src/index";
const env = require(`../src/environments/${process.env.APP_ENV}`);

describe("Server Running Test", () => {
  it(`Server is running on port ${env.port}`, async () => {
    expect(server.port).to.equal(env.port);
  });
});
