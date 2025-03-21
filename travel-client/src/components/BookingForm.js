import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";

const ADD_BOOKING = gql`
    mutation AddBooking($name: String!, $destination: String!, $date: String!, $price: Float!) {
        addBooking(name: $name, destination: $destination, date: $date, price: $price) {
            id
            name
        }
    }
`;

const BookingForm = () => {
    const [form, setForm] = useState({ name: "", destination: "", date: "", price: "" });
    const [addBooking] = useMutation(ADD_BOOKING);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addBooking({ variables: { ...form, price: parseFloat(form.price) } });
        setForm({ name: "", destination: "", date: "", price: "" });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="name" placeholder="Name" onChange={handleChange} value={form.name} required />
            <input name="destination" placeholder="Destination" onChange={handleChange} value={form.destination} required />
            <input name="date" type="date" onChange={handleChange} value={form.date} required />
            <input name="price" placeholder="Price" onChange={handleChange} value={form.price} required />
            <button type="submit">Add Booking</button>
        </form>
    );
};

export default BookingForm;
