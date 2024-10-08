import React, { useState, useEffect } from 'react';
import { Search, Calendar, MapPin, User, LogOut, QrCode } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';

// EventCard component definition
const EventCard = ({ title, date, location, category, imageUrl, isUserEvent }) => (
  <div className={`bg-white rounded-lg shadow-md overflow-hidden ${isUserEvent ? 'border-2 border-blue-500' : ''}`}>
    <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
    <div className="p-4">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <div className="flex items-center text-gray-600 mb-2">
        <Calendar className="w-4 h-4 mr-2" />
        <span>{date}</span>
      </div>
      <div className="flex items-center text-gray-600 mb-2">
        <MapPin className="w-4 h-4 mr-2" />
        <span>{location}</span>
      </div>
      <div className="text-sm text-blue-600">{category}</div>
      {isUserEvent && (
        <div className="mt-2">
          <Button className="w-full">
            <QrCode className="w-4 h-4 mr-2" />
            Show QR Code
          </Button>
        </div>
      )}
    </div>
  </div>
);

// QRCodeScanner component definition
const QRCodeScanner = ({ onScan }) => {
  const [qrCode, setQrCode] = useState('');

  const handleScan = () => {
    onScan(qrCode);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <Input
        type="text"
        placeholder="Enter QR Code"
        value={qrCode}
        onChange={(e) => setQrCode(e.target.value)}
      />
      <Button onClick={handleScan}>Scan QR Code</Button>
    </div>
  );
};

// AttendanceCertificate component definition
const AttendanceCertificate = ({ eventTitle, attendeeName, date }) => (
  <div className="bg-white p-8 rounded-lg shadow-lg text-center">
    <h2 className="text-3xl font-bold mb-4">Certificate of Attendance</h2>
    <p className="text-xl mb-4">This certifies that</p>
    <p className="text-2xl font-semibold mb-4">{attendeeName}</p>
    <p className="text-xl mb-4">has attended</p>
    <p className="text-2xl font-semibold mb-4">{eventTitle}</p>
    <p className="text-xl mb-4">for a duration of 4 hours on</p>
    <p className="text-2xl font-semibold mb-8">{date}</p>
    <div className="border-t-2 border-gray-300 pt-4">
      <p className="text-lg font-semibold">EventHub</p>
    </div>
  </div>
);

const ArtChainFrontend = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userEvents, setUserEvents] = useState([]);
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const [certificateData, setCertificateData] = useState(null);

  const itemsPerPage = 6;

  const currentDate = new Date();
  const nextWeek = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000);

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const mockUserEvents = [
    { id: 101, title: "Web Development Workshop", date: formatDate(currentDate), location: "Online", category: "Technology", imageUrl: "/api/placeholder/400/200" },
    { id: 102, title: "Digital Marketing Seminar", date: formatDate(nextWeek), location: "New York", category: "Business", imageUrl: "/api/placeholder/400/200" },
  ];

  const dummyEvents = [
    { id: 1, title: "Summer Music Festival", date: formatDate(currentDate), location: "New York", category: "Music", imageUrl: "/api/placeholder/400/200" },
    { id: 2, title: "Tech Conference 2024", date: formatDate(nextWeek), location: "San Francisco", category: "Technology", imageUrl: "/api/placeholder/400/200" },
    { id: 3, title: "Food & Wine Expo", date: "2024-10-01", location: "Chicago", category: "Food", imageUrl: "/api/placeholder/400/200" },
    { id: 4, title: "Art Gallery Opening", date: "2024-07-20", location: "Los Angeles", category: "Art", imageUrl: "/api/placeholder/400/200" },
    { id: 5, title: "Marathon 2024", date: "2024-11-10", location: "Boston", category: "Sports", imageUrl: "/api/placeholder/400/200" },
    { id: 6, title: "Book Fair", date: "2024-09-15", location: "Seattle", category: "Literature", imageUrl: "/api/placeholder/400/200" },
    { id: 7, title: "Comedy Night", date: "2024-08-30", location: "Chicago", category: "Entertainment", imageUrl: "/api/placeholder/400/200" },
    { id: 8, title: "Startup Pitch Competition", date: "2024-10-20", location: "Austin", category: "Business", imageUrl: "/api/placeholder/400/200" },
    { id: 9, title: "AI and Machine Learning Conference", date: formatDate(currentDate), location: "San Francisco", category: "Technology", imageUrl: "/api/placeholder/400/200" },
    { id: 10, title: "Sustainable Living Expo", date: formatDate(nextWeek), location: "Portland", category: "Lifestyle", imageUrl: "/api/placeholder/400/200" },
  ];

  const filteredEvents = dummyEvents.filter((event) => {
    return (
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (dateFilter ? event.date === dateFilter : true) &&
      (categoryFilter ? event.category === categoryFilter : true) &&
      (locationFilter ? event.location === locationFilter : true)
    );
  });

  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'user' && password === 'password') {
      setIsLoggedIn(true);
      setUserEvents(mockUserEvents);
    } else {
      alert('Invalid credentials');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
    setUserEvents([]);
  };

  const handleQRScan = (qrCode) => {
    const event = [...userEvents, ...dummyEvents].find(e => e.id.toString() === qrCode);
    if (event) {
      setCertificateData({
        eventTitle: event.title,
        attendeeName: username,
        date: event.date
      });
      setShowCertificate(true);
    } else {
      alert('Invalid QR Code');
    }
    setShowQRScanner(false);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, dateFilter, categoryFilter, locationFilter]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">EventHub</h1>
          <nav>
            <ul className="flex space-x-4">
              <li><a href="#" className="hover:text-blue-200">Home</a></li>
              <li><a href="#" className="hover:text-blue-200">Create Event</a></li>
              <li><a href="#" className="hover:text-blue-200">My Tickets</a></li>
              {isLoggedIn ? (
                <li>
                  <button onClick={handleLogout} className="flex items-center hover:text-blue-200">
                    <LogOut className="w-4 h-4 mr-1" />
                    Logout
                  </button>
                </li>
              ) : (
                <li><a href="#" className="hover:text-blue-200">Login</a></li>
              )}
            </ul>
          </nav>
        </div>
      </header>
      
      <main className="container mx-auto py-8">
        {!isLoggedIn && (
          <form onSubmit={handleLogin} className="mb-8 p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Login</h2>
            <div className="flex space-x-4">
              <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="flex-grow"
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex-grow"
              />
              <Button type="submit">Login</Button>
            </div>
          </form>
        )}

        <div className="mb-8">
          <div className="flex items-center bg-white rounded-lg shadow-md">
            <Input
              type="text"
              placeholder="Search events..."
              className="flex-grow rounded-l-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button className="rounded-r-lg">
              <Search className="w-6 h-6" />
            </Button>
          </div>
        </div>

        <div className="mb-8 flex space-x-4">
          <Input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="flex-grow"
          />
          <Select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="flex-grow"
          >
            <option value="">All Categories</option>
            <option value="Music">Music</option>
            <option value="Technology">Technology</option>
            <option value="Food">Food</option>
            <option value="Art">Art</option>
            <option value="Sports">Sports</option>
            <option value="Business">Business</option>
            <option value="Lifestyle">Lifestyle</option>
          </Select>
          <Select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="flex-grow"
          >
            <option value="">All Locations</option>
            <option value="New York">New York</option>
            <option value="San Francisco">San Francisco</option>
            <option value="Chicago">Chicago</option>
            <option value="Los Angeles">Los Angeles</option>
            <option value="Boston">Boston</option>
            <option value="Online">Online</option>
          </Select>
        </div>

        {isLoggedIn && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">My Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userEvents.map((event) => (
                <EventCard key={event.id} {...event} isUserEvent={true} />
              ))}
            </div>
            <Button onClick={() => setShowQRScanner(true)} className="mt-4">
              <QrCode className="w-4 h-4 mr-2" />
              Scan QR Code
            </Button>
          </div>
        )}

        <h2 className="text-2xl font-bold mb-4">All Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedEvents.map((event) => (
            <EventCard key={event.id} {...event} />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center mt-8">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                onClick={() => setCurrentPage(page)}
                variant={currentPage === page ? "default" : "outline"}
                className="mx-1"
              >
                {page}
              </Button>
            ))}
          </div>
        )}

        <Dialog open={showQRScanner} onOpenChange={setShowQRScanner}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Scan QR Code</DialogTitle>
            </DialogHeader>
            <QRCodeScanner onScan={handleQRScan} />
          </DialogContent>
        </Dialog>

        <Dialog open={showCertificate} onOpenChange={setShowCertificate}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Attendance Certificate</DialogTitle>
            </DialogHeader>
            {certificateData && (
              <AttendanceCertificate {...certificateData} />
            )}
            <DialogFooter>
              <Button onClick={() => setShowCertificate(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default ArtChainFrontend;
