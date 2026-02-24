const { api } = require("../api");

const callLogApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllCallLogs: builder.query({
      query: () => ({
        url: "conversations/",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllCallLogsQuery } = callLogApi;
