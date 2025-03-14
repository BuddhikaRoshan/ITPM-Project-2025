import React, { useState } from 'react';
import logo from '../assets/logo.png';
import Footer from '../components/Footer';

const Calendar = () => {

  const [payments, setPayments] = useState([]);
  const [newPayment, setNewPayment] = useState({
    description: '',
    amount: '',
    date: '',
    notes: ''
  });
  const [editingPayment, setEditingPayment] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Get current date in YYYY-MM-DD format for default date input
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPayment({
      ...newPayment,
      [name]: value
    });
  };



  const handleAddPayment = () => {
    if (newPayment.description && newPayment.amount && newPayment.date) {
      if (isEditing) {
        // Update existing payment
        setPayments(
          payments.map(payment => 
            payment.id === editingPayment 
              ? {...newPayment, id: editingPayment} 
              : payment
          )
        );
        setIsEditing(false);
        setEditingPayment(null);
      } else {
        // Add new payment
        setPayments([
          ...payments,
          {
            id: Date.now(),
            description: newPayment.description,
            amount: newPayment.amount,
            date: newPayment.date,
            notes: newPayment.notes || ''
          }
        ]);
      }
      // Reset form
      setNewPayment({
        description: '',
        amount: '',
        date: '',
        notes: ''
      });
    }
  };

  const handleEditPayment = (payment) => {
    setNewPayment({
      description: payment.description,
      amount: payment.amount,
      date: payment.date,
      notes: payment.notes
    });
    setIsEditing(true);
    setEditingPayment(payment.id);
  };

  const handleDeletePayment = (id) => {
    setPayments(payments.filter(payment => payment.id !== id));
  };

  const cancelEdit = () => {
    setNewPayment({
      description: '',
      amount: '',
      date: '',
      notes: ''
    });
    setIsEditing(false);
    setEditingPayment(null);
  };

  // Get all days in the current month for calendar
  const getDaysInMonth = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    
    // Get the first day of the month
    const firstDay = new Date(year, month, 1);
    // Get the last day of the month
    const lastDay = new Date(year, month + 1, 0);
    
    // Calculate days needed from previous month to fill first week
    const daysFromPrevMonth = firstDay.getDay();
    
    // Calculate days in current month
    const daysInCurrentMonth = lastDay.getDate();
    
    // Array to hold all calendar day objects
    const days = [];
    
    // Add days from previous month
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = daysFromPrevMonth - 1; i >= 0; i--) {
      const day = prevMonthLastDay - i;
      const date = new Date(year, month - 1, day);
      days.push({
        date,
        day,
        isCurrentMonth: false,
        formattedDate: formatDateToYYYYMMDD(date)
      });
    }
    
    // Add days from current month
    for (let day = 1; day <= daysInCurrentMonth; day++) {
      const date = new Date(year, month, day);
      days.push({
        date,
        day,
        isCurrentMonth: true,
        formattedDate: formatDateToYYYYMMDD(date)
      });
    }
    
    // Add days from next month to complete the grid (6 rows of 7 days)
    const daysNeeded = 42 - days.length;
    for (let day = 1; day <= daysNeeded; day++) {
      const date = new Date(year, month + 1, day);
      days.push({
        date,
        day,
        isCurrentMonth: false,
        formattedDate: formatDateToYYYYMMDD(date)
      });
    }
    
    return days;
  };

  // Format date to YYYY-MM-DD for comparison with payment dates
  const formatDateToYYYYMMDD = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Group payments by date for easy lookup
  const getPaymentsByDate = () => {
    const paymentMap = {};
    
    payments.forEach(payment => {
      if (!paymentMap[payment.date]) {
        paymentMap[payment.date] = [];
      }
      paymentMap[payment.date].push(payment);
    });
    
    return paymentMap;
  };

  const calendarDays = getDaysInMonth();
  const paymentsByDate = getPaymentsByDate();

  // Get month name and year for calendar header
  const getMonthAndYear = () => {
    const today = new Date();
    return today.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-gray-900  flex flex-col">
          <main className="flex-grow container mx-auto p-6">
 <div className="flex justify-center py-4">
        <img src={logo} alt="Logo" className="h-16" />
        <h1 className="text-3xl text-white font-bold mb-6">Payment Calendar</h1>
      </div>
  
  
        
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-bold mb-4">
              {isEditing ? 'Update Payment' : 'Add New Payment'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <input
                  type="text"
                  name="description"
                  value={newPayment.description}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  placeholder="Payment description"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Amount</label>
                <input
                  type="number"
                  name="amount"
                  value={newPayment.amount}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Date</label>
                <input
                  type="date"
                  name="date"
                  value={newPayment.date}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  defaultValue={getCurrentDate()}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Notes (Optional)</label>
                <input
                  type="text"
                  name="notes"
                  value={newPayment.notes}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  placeholder="Additional notes"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={handleAddPayment}
                disabled={!newPayment.description || !newPayment.amount || !newPayment.date}
                className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-blue-300 flex-1"
              >
                {isEditing ? 'Update Payment' : 'Add Payment'}
              </button>
              
              {isEditing && (
                <button
                  onClick={cancelEdit}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
          
          {/* Calendar View */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 bg-blue-600 text-white flex justify-between items-center">
              <h2 className="text-xl font-bold">{getMonthAndYear()}</h2>
            </div>
            
            {/* Calendar header */}
            <div className="grid grid-cols-7 bg-gray-100">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="p-2 text-center font-medium border-b">
                  {day}
                </div>
              ))}
            </div>
            
            {/* Calendar days */}
            <div className="grid grid-cols-7">
              {calendarDays.map((day, index) => {
                const hasPayments = paymentsByDate[day.formattedDate] && paymentsByDate[day.formattedDate].length > 0;
                
                return (
                  <div 
                    key={index} 
                    className={`min-h-24 p-1 border ${!day.isCurrentMonth ? 'bg-gray-50 text-gray-400' : ''}`}
                  >
                    <div className="flex justify-between items-start">
                      <span className={`font-medium ${new Date().toDateString() === day.date.toDateString() ? 'bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center' : ''}`}>
                        {day.day}
                      </span>
                    </div>
                    
                    {hasPayments && (
                      <div className="mt-1 overflow-y-auto max-h-20">
                        {paymentsByDate[day.formattedDate].map(payment => (
                          <div 
                            key={payment.id} 
                            className="text-xs p-1 mb-1 bg-blue-100 rounded cursor-pointer hover:bg-blue-200"
                            onClick={() => handleEditPayment(payment)}
                          >
                            <div className="font-medium truncate">{payment.description}</div>
                            <div className="font-semibold text-blue-800">${parseFloat(payment.amount).toFixed(2)}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* List View */}
          <div className="mt-8 bg-white rounded-lg shadow-md overflow-hidden">
            <h2 className="text-xl font-bold p-4 bg-gray-50 border-b">Payment List</h2>
            
            {payments.length > 0 ? (
              <div className="divide-y">
                {payments.sort((a, b) => new Date(a.date) - new Date(b.date)).map(payment => (
                  <div key={payment.id} className="flex justify-between items-center p-4 hover:bg-gray-50">
                    <div className="flex-1">
                      <div className="font-medium">{payment.description}</div>
                      <div className="text-sm text-gray-600">
                        {new Date(payment.date).toLocaleDateString('en-US', { 
                          weekday: 'short',
                          month: 'short', 
                          day: 'numeric'
                        })}
                        {payment.notes && <span className="italic ml-2">- {payment.notes}</span>}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="font-semibold">${parseFloat(payment.amount).toFixed(2)}</div>
                      <div>
                        <button 
                          onClick={() => handleEditPayment(payment)}
                          className="text-blue-600 mr-3 hover:text-blue-800"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDeletePayment(payment.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-gray-500">
                No payments added yet. Add your first payment above.
              </div>
            )}
            
          </div>
          
        </div>
        
      </main>

    </div>
    
  );
};

export default Calendar;