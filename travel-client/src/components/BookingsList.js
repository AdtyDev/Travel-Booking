import React, { useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import "./BookingsList.css";

const GET_BOOKINGS = gql`
    query {
        getBookings {
            id
            name
            destination
            date
            price
        }
    }
`;

const DELETE_BOOKING = gql`
    mutation DeleteBooking($id: ID!) {
        deleteBooking(id: $id)
    }
`;

const UPDATE_BOOKING = gql`
    mutation UpdateBooking($id: ID!, $name: String, $destination: String, $date: String, $price: Float) {
        updateBooking(id: $id, name: $name, destination: $destination, date: $date, price: $price) {
            id
            name
            destination
            date
            price
        }
    }
`;

const BookingsList = () => {
    const { data, loading, error, refetch } = useQuery(GET_BOOKINGS);
    const [deleteBooking] = useMutation(DELETE_BOOKING);
    const [updateBooking] = useMutation(UPDATE_BOOKING);

    const [editId, setEditId] = useState(null);
    const [form, setForm] = useState({ name: "", destination: "", date: "", price: "" });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const handleDelete = async (id) => {
        await deleteBooking({ variables: { id } });
        refetch();
    };

    const handleEdit = (booking) => {
        setEditId(booking.id);
        setForm({
            name: booking.name,
            destination: booking.destination,
            date: booking.date,
            price: booking.price,
        });
    };

    const handleUpdate = async () => {
        await updateBooking({
            variables: { id: editId, ...form, price: parseFloat(form.price) }
        });
        setEditId(null);
        setForm({ name: "", destination: "", date: "", price: "" });
        refetch();
    };

    return (
        <div className="container">
            <h2>Bookings</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Destination</th>
                        <th>Date</th>
                        <th>Price (₹)</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.getBookings.map((booking) => (
                        <tr key={booking.id}>
                            {editId === booking.id ? (
                                <>
                                    <td><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></td>
                                    <td><input value={form.destination} onChange={(e) => setForm({ ...form, destination: e.target.value })} /></td>
                                    <td><input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} /></td>
                                    <td><input value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} /></td>
                                    <td>
                                        <button className="update-btn" onClick={handleUpdate}>Save</button>
                                        <button className="cancel-btn" onClick={() => setEditId(null)}>Cancel</button>
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td>{booking.name}</td>
                                    <td>{booking.destination}</td>
                                    <td>{booking.date}</td>
                                    <td>₹{booking.price}</td>
                                    <td>
                                        <button className="edit-btn" onClick={() => handleEdit(booking)}>Edit</button>
                                        <button className="delete-btn" onClick={() => handleDelete(booking.id)}>Delete</button>
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BookingsList;
