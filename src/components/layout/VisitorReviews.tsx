import { FormEvent, useEffect, useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

type Review = { id: string; name: string; rating: number; comment: string; created_at: string };

const VisitorReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let active = true;
    supabase.from("reviews").select("id,name,rating,comment,created_at").order("created_at", { ascending: false }).limit(6)
      .then(({ data, error }) => {
        if (!active) return;
        if (error) setMessage("Reviews could not be loaded right now.");
        else setReviews(data ?? []);
      });
    return () => { active = false; };
  }, []);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!rating) { setMessage("Please choose a star rating."); return; }
    setBusy(true);
    setMessage("");
    const cleanName = name.trim();
    const cleanComment = comment.trim();
    const { data, error } = await supabase.from("reviews")
      .insert({ name: cleanName, rating, comment: cleanComment })
      .select("id,name,rating,comment,created_at").single();
    setBusy(false);
    if (error || !data) { setMessage("Your review could not be posted. Please try again."); return; }
    setReviews((current) => [data, ...current].slice(0, 6));
    setName(""); setComment(""); setRating(0);
    setMessage("Thank you — your review is now posted.");
  };

  return (
    <section className="border-t border-background/15 py-10" aria-labelledby="visitor-reviews-heading">
      <h2 id="visitor-reviews-heading" className="text-2xl font-bold text-background mb-6">Your reviews</h2>
      <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-8 lg:gap-12">
        <form onSubmit={submit} className="space-y-4 max-w-xl">
          <label className="block text-sm font-medium text-background" htmlFor="review-name">Your name</label>
          <input id="review-name" value={name} onChange={(event) => setName(event.target.value)} required minLength={2} maxLength={80}
            className="w-full rounded-md bg-background text-foreground border border-border px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
          <div>
            <span className="block text-sm font-medium text-background mb-2">Your rating</span>
            <div className="flex gap-1" role="group" aria-label="Choose a rating from 1 to 5 stars">
              {[1, 2, 3, 4, 5].map((value) => (
                <Button key={value} type="button" variant="ghost" size="icon" className="text-lumex-gold hover:text-lumex-gold hover:bg-background/10"
                  aria-label={`${value} star${value === 1 ? "" : "s"}`} aria-pressed={rating === value}
                  onMouseEnter={() => setHoverRating(value)} onMouseLeave={() => setHoverRating(0)} onFocus={() => setHoverRating(value)} onBlur={() => setHoverRating(0)}
                  onClick={() => setRating(value)}>
                  <Star className={`w-6 h-6 ${(hoverRating || rating) >= value ? "fill-current" : ""}`} />
                </Button>
              ))}
            </div>
          </div>
          <label className="block text-sm font-medium text-background" htmlFor="review-comment">Your review</label>
          <textarea id="review-comment" value={comment} onChange={(event) => setComment(event.target.value)} required minLength={10} maxLength={1000} rows={3}
            className="w-full rounded-md bg-background text-foreground border border-border px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-y" />
          <Button type="submit" disabled={busy} className="bg-secondary text-secondary-foreground hover:bg-secondary/90">{busy ? "Posting…" : "Post review"}</Button>
          {message && <p role="status" className="text-sm text-background/80">{message}</p>}
        </form>
        <div className="space-y-4 max-h-96 overflow-y-auto" aria-label="Recent visitor reviews">
          {reviews.map((review) => (
            <article key={review.id} className="border-b border-background/15 pb-4 last:border-0">
              <div className="flex items-center justify-between gap-3">
                <strong className="text-background text-sm break-words">{review.name}</strong>
                <time className="text-xs text-background/60 shrink-0" dateTime={review.created_at}>{new Date(review.created_at).toLocaleDateString()}</time>
              </div>
              <div className="flex gap-0.5 my-1 text-lumex-gold" aria-label={`${review.rating} out of 5 stars`}>
                {[1, 2, 3, 4, 5].map((value) => <Star key={value} className={`w-4 h-4 ${value <= review.rating ? "fill-current" : ""}`} />)}
              </div>
              <p className="text-sm text-background/75 whitespace-pre-wrap break-words">{review.comment}</p>
            </article>
          ))}
          {!reviews.length && <p className="text-sm text-background/65">Be the first to leave a review.</p>}
        </div>
      </div>
    </section>
  );
};

export default VisitorReviews;