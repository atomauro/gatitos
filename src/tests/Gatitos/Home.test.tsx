/* eslint-disable @typescript-eslint/no-explicit-any */
import fetchGatitos from "../../pages/Gatitos/Home";

describe("fetchGatitos", () => {
  it("makes API call and returns data", async () => {
    const data = [{ id: "cat1" }, { id: "cat2" }];
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockResolvedValue(data),
    } as any);

    const result = await fetchGatitos();
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(result).toEqual(data);
  });

  it("throws error on non-ok response", async () => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      ok: false,
    } as any);

    await expect(fetchGatitos()).rejects.toThrow("Network response was not ok");
  });
});
