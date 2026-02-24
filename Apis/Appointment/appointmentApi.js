const { api } = require("../api");

const appointmentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    postAppointment: builder.mutation({
      query: (appointmentData) => ({
        url: "appointments/",
        method: "POST",
        body: appointmentData,
      }),
    }),
  }),
});
export const { usePostAppointmentMutation } = appointmentApi;
