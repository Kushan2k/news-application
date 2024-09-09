import React from "react";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import "../contact.css";

const Contact = () => {
  const form = useForm();

  const onSubmit = async (data) => {


    data.access_key = "eff4f9b0-bc7b-4b46-8af0-05b507b2c852";

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());

    if (res.success) {
      toast.info("Your message is sent!");
      form.reset(); // Reset form fields after successful submission
    } else {
      toast.error("Failed to send message.");
    }
  };

  const handleButtonClick = () => {
    toast.info("Your message is being sent...");
  };

  return (
    <section className="contacts mt-10">
      <form {...form} onSubmit={form.handleSubmit(onSubmit)}>
        <h2>Contact Form</h2>
        <div className="input-box">
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            className="field"
            placeholder="Enter your name"
            {...form.register("name", { required: true })}
          />
        </div>
        <div className="input-box">
          <label>Email</label>
          <input
            type="email"
            name="email"
            className="field"
            placeholder="Enter your email"
            {...form.register("email", { required: true })}
          />
        </div>
        <div className="input-box border-b-2">
          <label>Your message</label>
          <textarea
            rows={2}
            name="message"
            className="field mess border-b-2"
            placeholder="Enter your message"
            {...form.register("message", { required: true })}
          ></textarea>
        </div>
        <button type="submit" onClick={handleButtonClick}>Send Message</button>
      </form>
    </section>
  );
};

export default Contact;
