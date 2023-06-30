import { _getToken } from "../spotify";

it("should get a token", () => {
  return _getToken().then((res) => {
    expect(res).not.toBeUndefined();
  });
});
