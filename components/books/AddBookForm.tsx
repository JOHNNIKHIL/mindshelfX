"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddBookForm() {
  const router = useRouter();
  const [form, setForm] = useState({title:"",author:"",genre:"",totalPages:"",pagesRead:"0",favorite:false,cover:""});
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const set = (key:string, value:string|boolean) => setForm(f => ({...f,[key]:value}));

  async function submit(e:React.FormEvent) {
    e.preventDefault(); setError(""); setSaving(true);
    const totalPages = Number(form.totalPages);
    const pagesRead = Number(form.pagesRead || 0);
    if (!form.title.trim() || !form.author.trim() || !form.genre.trim() || !Number.isInteger(totalPages) || totalPages <= 0) {
      setError("Please fill title, author, genre and a valid total page count."); setSaving(false); return;
    }
    const res = await fetch("/api/books",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...form,totalPages,pagesRead,cover:form.cover || null})});
    if (!res.ok) { const b=await res.json().catch(()=>({})); setError(b.error||"Could not add book."); setSaving(false); return; }
    const book = await res.json();
    router.push(`/book/${book.id}`);
  }

  return <form className="form-panel" onSubmit={submit}>
    <div className="form-grid">
      <label>Book title<input value={form.title} onChange={e=>set("title",e.target.value)} placeholder="e.g. Atomic Habits" /></label>
      <label>Author<input value={form.author} onChange={e=>set("author",e.target.value)} placeholder="Author name" /></label>
      <label>Genre<input value={form.genre} onChange={e=>set("genre",e.target.value)} placeholder="e.g. Self Development" /></label>
      <label>Total pages<input type="number" min="1" value={form.totalPages} onChange={e=>set("totalPages",e.target.value)} placeholder="320" /></label>
      <label>Pages read<input type="number" min="0" value={form.pagesRead} onChange={e=>set("pagesRead",e.target.value)} placeholder="0" /></label>
      <label>Cover URL <span className="optional">(optional for now)</span><input value={form.cover} onChange={e=>set("cover",e.target.value)} placeholder="https://..." /></label>
    </div>
    <label className="check"><input type="checkbox" checked={form.favorite} onChange={e=>set("favorite",e.target.checked)} /> Mark as favorite</label>
    {error && <div className="error">{error}</div>}
    <div className="form-actions"><button type="button" className="btn" onClick={()=>router.back()}>Cancel</button><button className="btn primary" disabled={saving}>{saving ? "Adding..." : "Add book"}</button></div>
  </form>;
}
