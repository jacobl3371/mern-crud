import React from "react";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import RateLimitedUI from "../components/RateLimitedUI";
import NoteCard from "../components/NoteCard";
import NotesNotFound from "../components/NotesNotFound";
import { useAuthStore } from "../store/authStore.js";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const { getAllNotes } = useAuthStore();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const notes = await getAllNotes();
        setNotes(notes);
        setIsRateLimited(false);
      } catch (error) {
        console.log("Error fetching notes");
        console.log(error);
        if (error.response?.status == 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to load notes");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [getAllNotes]);

  return (
    <div className="w-full min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && (
          <div className="text-center text-primary py-10">Loading notes...</div>
        )}

        {notes.length === 0 && !isRateLimited && <NotesNotFound />}

        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
