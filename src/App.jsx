
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Events from "./pages/Events";
import Login from "./pages/login";
import Register from "./pages/Register";
import EventDetails from "./pages/EventDetails";
import MyEvents from "./pages/MyEvents";
import './css/App.css'

function App()
{
    return (
        <BrowserRouter>
            <div className="app">
                <Navbar />

                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<Navigate to="/events" replace />} />
                        <Route path="/events" element={<Events />} />
                        <Route path="/events/:id" element={<EventDetails />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/my-events" element={<MyEvents />} />
                        <Route path="*" element={<h2>404 - Page Not Found</h2>} />
                    </Routes>
                </main>

                <footer className="footer">
                    <p>© {new Date().getFullYear()} Evora. Discover your next experience.</p>
                </footer>
            </div>
        </BrowserRouter>
    );
}

export default App;