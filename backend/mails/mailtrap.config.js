import { MailtrapClient } from "mailtrap";  

import dotenv from "dotenv";                
dotenv.config();                           

export const mailtrapClient = new MailtrapClient({
  endpoint: 'https://send.api.mailtrap.io',
  token: '63aa17e3b2a402cde51a454c3d8d365a',
});
export const sender = {
email: "hello@demomailtrap.co",
name: "abdalrhman foly",
};
