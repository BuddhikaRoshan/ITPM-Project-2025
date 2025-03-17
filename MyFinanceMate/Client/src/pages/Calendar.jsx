import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import { Modal, Button, Input, DatePicker, Table } from "antd";
import { jsPDF } from "jspdf";
import dayjs from "dayjs";
import logo from "../assets/logo.png";
import Header from "../components/Header";

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [form, setForm] = useState({ description: "", amount: "", date: null, notes: "" });

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/api/payments");
      setEvents(
        data.map((payment) => ({
          id: payment._id,
          title: `${payment.description} - Rs.${payment.amount}`,
          start: payment.date,
          extendedProps: payment,
        }))
      );
    } catch (error) {
      console.error("Error fetching payments", error);
    }
  };

  const handleDateClick = (info) => {
    setForm({ description: "", amount: "", date: info.date.toISOString(), notes: "" });
    setCurrentEvent(null);
    setModalVisible(true);
  };

  const handleEventClick = (info) => {
    setForm({ ...info.event.extendedProps });
    setCurrentEvent(info.event);
    setModalVisible(true);
  };

  const handleSubmit = async () => {
    try {
      if (currentEvent) {
        await axios.put(`http://localhost:4000/api/payments/${currentEvent.id}`, form);
      } else {
        await axios.post("http://localhost:4000/api/payments", form);
      }
      fetchPayments();
      setModalVisible(false);
    } catch (error) {
      console.error("Error saving payment", error);
    }
  };

  const handleDelete = async () => {
    if (currentEvent) {
      try {
        await axios.delete(`http://localhost:4000/api/payments/${currentEvent.id}`);
        fetchPayments();
        setModalVisible(false);
      } catch (error) {
        console.error("Error deleting payment", error);
      }
    }
  };

  const columns = [
    { title: "Description", dataIndex: "description", key: "description" },
    { title: "Amount (Rs.)", dataIndex: "amount", key: "amount" },
    { title: "Date", dataIndex: "date", key: "date", render: (text) => dayjs(text).format("YYYY-MM-DD") },
    { title: "Notes", dataIndex: "notes", key: "notes" },
  ];

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <Header />
      <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">Special Payment Calendar</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <FullCalendar 
          plugins={[dayGridPlugin, interactionPlugin]} 
          initialView="dayGridMonth" 
          events={events} 
          dateClick={handleDateClick} 
          eventClick={handleEventClick} 
          height="auto"
        />
      </div>
      <div className="mt-6 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-blue-800 mb-3">Payment List</h2>
        <Table 
          dataSource={events.map((e) => e.extendedProps)} 
          columns={columns} 
          rowKey="id" 
          className="bg-white"
          pagination={{ pageSize: 5 }}
        />
        <Button className="mt-4 bg-blue-600 text-white hover:bg-blue-700" onClick={() => {}}>
          Download PDF
        </Button>
      </div>
      <Modal
        title={currentEvent ? "Edit Payment" : "Add Payment"}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        className="rounded-lg"
      >
        <Input 
          className="mb-3 p-2 rounded border border-gray-300" 
          placeholder="Description" 
          value={form.description} 
          onChange={(e) => setForm({ ...form, description: e.target.value })} 
        />
        <Input 
          className="mb-3 p-2 rounded border border-gray-300" 
          placeholder="Amount" 
          type="number" 
          value={form.amount} 
          onChange={(e) => setForm({ ...form, amount: e.target.value })} 
        />
        <DatePicker 
          className="mb-3 p-2 rounded border border-gray-300 w-full" 
          value={form.date ? dayjs(form.date) : null} 
          onChange={(date) => setForm({ ...form, date: date.toISOString() })} 
        />
        <Input.TextArea 
          className="mb-3 p-2 rounded border border-gray-300" 
          placeholder="Notes" 
          value={form.notes} 
          onChange={(e) => setForm({ ...form, notes: e.target.value })} 
        />
        <div className="flex justify-between">
          <Button 
            type="primary" 
            className="bg-blue-600 text-white hover:bg-blue-700" 
            onClick={handleSubmit}
          >
            Save
          </Button>
          {currentEvent && (
            <Button 
              type="danger" 
              className="bg-red-600 text-white hover:bg-red-700" 
              onClick={handleDelete}
            >
              Delete
            </Button>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default Calendar;