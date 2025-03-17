"use client"

import React from "react"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import {
  Heart,
  ArrowLeft,
  Send,
  MessageCircle,
  MoreHorizontal,
  HelpCircle,
  Sparkles,
  Star,
  Flame,
  Crown,
} from "lucide-react"

export default function GossipPage({ params }) {
  const router = useRouter()
  const commentInputRef = useRef(null)
  const [comment, setComment] = useState("")
  const [replyingTo, setReplyingTo] = useState(null)
  const [replyText, setReplyText] = useState("")

  // Sample gossip data - in a real app, you would fetch this based on the ID
  const gossip = {
    id: params.id,
    person1: {
      name: "Emma",
      year: "2nd Year",
      major: "Computer Science",
      avatar: "/placeholder.svg?height=150&width=150",
    },
    person2: {
      name: "Noah",
      year: "3rd Year",
      major: "Engineering",
      avatar: "/placeholder.svg?height=150&width=150",
    },
    content:
      "Rumor has it they were spotted sharing milkshakes at the campus café with ONE straw! 🍦👀 Study buddies or something spicier?",
    time: "2h ago",
    likes: 128,
  }

  const [comments, setComments] = useState([
    {
      id: 1,
      user: "jessica_m",
      avatar: "/placeholder.svg?height=40&width=40",
      content:
        "OMG I saw them together at the library last week too! They were definitely flirting 💕 She kept twirling her hair and he couldn't stop smiling!",
      likes: 24,
      time: "2h ago",
      isLiked: false,
      replies: [
        {
          id: 101,
          user: "campus_spy",
          avatar: "/placeholder.svg?height=40&width=40",
          content: "I can confirm! They've been 'studying' together every Tuesday and Thursday 📚💘",
          time: "1h ago",
          likes: 12,
          isLiked: false,
        },
      ],
    },
    {
      id: 2,
      user: "basketball_king",
      avatar: "/placeholder.svg?height=40&width=40",
      content:
        "Noah told me he's been crushing on Emma for months! Said he purposely picked the same elective just to be near her 🔥",
      likes: 18,
      time: "3h ago",
      isLiked: true,
      replies: [],
    },
    {
      id: 3,
      user: "shilpi",
      avatar: "/placeholder.svg?height=40&width=40",
      content:
        "As the cutest person on campus, I can confirm this is the most adorable couple I've seen! They're always giggling together in the quad 💖",
      likes: 42,
      time: "4h ago",
      isLiked: true,
      replies: [
        {
          id: 104,
          user: "campus_tea",
          avatar: "/placeholder.svg?height=40&width=40",
          content: "Shilpi knows best! If she ships it, it must be real! 👑",
          time: "3h ago",
          likes: 20,
          isLiked: false,
        },
      ],
    },
    {
      id: 4,
      user: "party_planner",
      avatar: "/placeholder.svg?height=40&width=40",
      content:
        "They were both at my party last weekend and disappeared for like an hour... came back looking all flustered! 🎉😏",
      likes: 15,
      time: "1d ago",
      isLiked: false,
      replies: [],
    },
  ])

  const handleLike = (id, isReply = false, parentId) => {
    if (!isReply) {
      setComments(
        comments.map((c) => {
          if (c.id === id) {
            return {
              ...c,
              isLiked: !c.isLiked,
              likes: c.isLiked ? c.likes - 1 : c.likes + 1,
            }
          }
          return c
        }),
      )
    } else if (parentId) {
      setComments(
        comments.map((c) => {
          if (c.id === parentId) {
            return {
              ...c,
              replies: c.replies.map((r) => {
                if (r.id === id) {
                  return {
                    ...r,
                    isLiked: !r.isLiked,
                    likes: r.isLiked ? r.likes - 1 : r.likes + 1,
                  }
                }
                return r
              }),
            }
          }
          return c
        }),
      )
    }
  }

  const handleReply = (commentId) => {
    if (replyingTo === commentId) {
      setReplyingTo(null)
      setReplyText("")
    } else {
      setReplyingTo(commentId)
      setReplyText("")
    }
  }

  const handleSubmitReply = (commentId) => {
    if (!replyText.trim()) return

    const newReply = {
      id: Date.now(),
      user: "you",
      avatar: "/placeholder.svg?height=40&width=40",
      content: replyText,
      time: "Just now",
      likes: 0,
      isLiked: false,
    }

    setComments(
      comments.map((c) => {
        if (c.id === commentId) {
          return {
            ...c,
            replies: [...c.replies, newReply],
          }
        }
        return c
      }),
    )

    setReplyingTo(null)
    setReplyText("")
  }

  const handleSubmitComment = (e) => {
    e.preventDefault()
    if (!comment.trim()) return

    const newComment = {
      id: Date.now(),
      user: "you",
      avatar: "/placeholder.svg?height=40&width=40",
      content: comment,
      likes: 0,
      time: "Just now",
      isLiked: false,
      replies: [],
    }

    setComments([newComment, ...comments])
    setComment("")
  }

  const getCommentCount = () => {
    let count = comments.length
    comments.forEach((comment) => {
      count += comment.replies.length
    })
    return count
  }

  return (
    <div className="min-h-screen bg-[#FFF3E0] relative overflow-hidden">
      {/* Cute Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Pastel pattern background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/placeholder.svg?height=200&width=200')] opacity-20"></div>
        </div>

        {/* Floating hearts */}
        {[...Array(20)].map((_, i) => (
          <div
            key={`heart-${i}`}
            className="absolute opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 45}deg)`,
              animation: `float ${Math.random() * 10 + 15}s ease-in-out infinite, 
                          pulse ${Math.random() * 5 + 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          >
            <img
  src="\pink-hearts.png"
  alt="floating hearts"
  style={{
    width: `${Math.random() * 300 + 15}px`,
    height: "auto",
  }}
/>
          </div>
        ))}

        {/* Decorative circles */}
        {[...Array(15)].map((_, i) => (
          <div
            key={`circle-${i}`}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 60 + 20}px`,
              height: `${Math.random() * 60 + 20}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: [
                "rgba(255, 182, 193, 0.3)", // Light pink
                "rgba(255, 218, 185, 0.3)", // Peach
                "rgba(255, 255, 224, 0.3)", // Light yellow
                "rgba(230, 230, 250, 0.3)", // Lavender
                "rgba(176, 224, 230, 0.3)", // Powder blue
              ][Math.floor(Math.random() * 5)],
              animation: `float ${Math.random() * 20 + 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}

        {/* Cute stars */}
        {[...Array(10)].map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `pulse ${Math.random() * 4 + 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          >
            <Star size={Math.random() * 20 + 10} className="text-yellow-300" fill="#FFD700" />
          </div>
        ))}
      </div>

      {/* Header */}
      <header className="bg-gradient-to-r from-[#FF9999] to-[#FFBFA9] p-4 shadow-md sticky top-0 z-10">
        <div className="container mx-auto flex items-center">
          <Button variant="ghost" size="icon" className="text-white mr-2" onClick={() => router.back()}>
            <ArrowLeft size={24} />
          </Button>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <Heart className="text-white" size={20} fill="white" />
            Campus Whispers
            <Sparkles className="text-yellow-200" size={16} />
          </h1>
          <div className="ml-auto flex items-center gap-2">
            <Crown className="text-yellow-300" size={18} />
            <span className="text-white text-sm font-medium">Shilpi's Gossip Corner</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col xl:flex-row gap-8">
          {/* Left Panel - Profiles and Gossip */}
          <div className="xl:w-2/5 space-y-6">
            {/* Profile Circles with Question Mark */}
            <div className="relative h-80 flex items-center justify-center mb-8">
              {/* Container to center the entire profile section */}
              <div className="relative w-full max-w-md mx-auto">
                {/* Person 1 Circle */}
                <div className="absolute left-1/2 transform -translate-x-[65%] z-10">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-300 to-pink-400 blur-md transform scale-110"></div>
                    <Avatar className="h-48 w-48 border-4 border-white">
                      <AvatarImage src={gossip.person1.avatar} alt={gossip.person1.name} />
                      <AvatarFallback className="bg-pink-200 text-4xl">{gossip.person1.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="absolute bottom-0 left-0 bg-pink-100 rounded-full px-4 py-2 text-sm font-bold border-2 border-white shadow-md">
                    <div>{gossip.person1.name}</div>
                    <div className="text-xs text-pink-600">{gossip.person1.year}</div>
                  </div>
                </div>

                {/* Person 2 Circle */}
                <div className="absolute left-1/2 transform -translate-x-[-15%] z-10">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-300 to-purple-400 blur-md transform scale-110"></div>
                    <Avatar className="h-48 w-48 border-4 border-white">
                      <AvatarImage src={gossip.person2.avatar} alt={gossip.person2.name} />
                      <AvatarFallback className="bg-blue-200 text-4xl">{gossip.person2.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="absolute bottom-0 right-0 bg-blue-100 rounded-full px-4 py-2 text-sm font-bold border-2 border-white shadow-md">
                    <div>{gossip.person2.name}</div>
                    <div className="text-xs text-blue-600">{gossip.person2.year}</div>
                  </div>
                </div>

                {/* Question Mark - Perfectly centered */}
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 bg-yellow-300 rounded-full h-20 w-20 flex items-center justify-center border-4 border-white shadow-lg animate-pulse">
                  <HelpCircle className="text-white" size={36} />
                </div>
              </div>
            </div>

            {/* Gossip Card */}
            <Card className="bg-white/90 backdrop-blur-sm rounded-3xl border-pink-200 overflow-hidden shadow-xl">
              <CardHeader className="bg-gradient-to-r from-pink-200 to-purple-200 pb-2">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <Flame className="text-orange-500" size={20} />
                    Hot Gossip
                  </h2>
                  <div className="flex items-center gap-1 bg-white/50 rounded-full px-3 py-1 text-xs">
                    <Star className="text-yellow-500" size={14} fill="currentColor" />
                    <span>Trending</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex gap-2 mb-3">
                  <div className="flex -space-x-2">
                    <Avatar className="h-6 w-6 border-2 border-white">
                      <AvatarImage src={gossip.person1.avatar} alt={gossip.person1.name} />
                      <AvatarFallback>{gossip.person1.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <Avatar className="h-6 w-6 border-2 border-white">
                      <AvatarImage src={gossip.person2.avatar} alt={gossip.person2.name} />
                      <AvatarFallback>{gossip.person2.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="text-sm">
                    <span className="font-bold">{gossip.person1.name}</span> &{" "}
                    <span className="font-bold">{gossip.person2.name}</span>
                  </div>
                </div>

                <p className="text-gray-700 text-lg font-medium mb-4">{gossip.content}</p>

                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    {gossip.time} • {gossip.person1.year} & {gossip.person2.year}
                  </div>
                  <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" className="text-pink-500 hover:text-pink-600 hover:bg-pink-50">
                      <Heart className="h-5 w-5 mr-1" fill="#FFB6C1" /> {gossip.likes}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-blue-500 hover:text-blue-600 hover:bg-blue-50"
                      onClick={() => commentInputRef.current?.focus()}
                    >
                      <MessageCircle className="h-5 w-5 mr-1" /> {getCommentCount()}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Shilpi Special Card */}
            <Card className="bg-gradient-to-r from-pink-100 to-purple-100 backdrop-blur-sm rounded-3xl border-pink-200 overflow-hidden shadow-xl">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-300 to-pink-300 blur-sm transform scale-110"></div>
                    <Avatar className="h-12 w-12 border-2 border-white">
                      <AvatarImage src="/placeholder.svg?height=60&width=60" alt="Shilpi" />
                      <AvatarFallback className="bg-yellow-200 text-lg">S</AvatarFallback>
                    </Avatar>
                    <div className="absolute -top-1 -right-1">
                      <Crown className="text-yellow-500" size={14} fill="#FFD700" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-sm flex items-center gap-1">
                      Shilpi <span className="text-pink-500">(the cutest of them all)</span>
                    </h3>
                    <p className="text-xs text-gray-600">Campus Gossip Queen</p>
                  </div>
                </div>
                <p className="text-sm mt-2 italic">
                  "This is the juiciest gossip I've seen all semester! I'm totally shipping these two! 💖"
                </p>
              </CardContent>
            </Card>

            {/* Additional Info Cards - Only visible on larger screens */}
            <div className="hidden xl:block space-y-4">
              <Card className="bg-white/80 backdrop-blur-sm rounded-2xl border-pink-100 overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-pink-100 to-pink-200 pb-2">
                  <h3 className="text-md font-bold">About {gossip.person1.name}</h3>
                </CardHeader>
                <CardContent className="p-4">
                  <p className="text-sm">
                    <span className="font-bold">Major:</span> {gossip.person1.major}
                  </p>
                  <p className="text-sm">
                    <span className="font-bold">Year:</span> {gossip.person1.year}
                  </p>
                  <p className="text-sm mt-2">
                    Known for always carrying a cute teddy bear keychain and acing all her coding assignments!
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm rounded-2xl border-blue-100 overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-100 to-blue-200 pb-2">
                  <h3 className="text-md font-bold">About {gossip.person2.name}</h3>
                </CardHeader>
                <CardContent className="p-4">
                  <p className="text-sm">
                    <span className="font-bold">Major:</span> {gossip.person2.major}
                  </p>
                  <p className="text-sm">
                    <span className="font-bold">Year:</span> {gossip.person2.year}
                  </p>
                  <p className="text-sm mt-2">
                    Star of the engineering department and always seen at the campus coffee shop studying late!
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right Panel - Comments */}
          <div className="xl:w-3/5">
            <Card className="bg-white/90 backdrop-blur-sm rounded-3xl border-pink-200 overflow-hidden shadow-xl">
              <CardHeader className="bg-gradient-to-r from-pink-200 to-purple-200 pb-2">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <MessageCircle className="text-pink-500" size={18} />
                  Campus Tea ({getCommentCount()})
                </h2>
              </CardHeader>
              <CardContent className="p-0">
                <form onSubmit={handleSubmitComment} className="p-4 border-b border-pink-100 flex gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Your avatar" />
                    <AvatarFallback>You</AvatarFallback>
                  </Avatar>
                  <Input
                    ref={commentInputRef}
                    placeholder="Spill the tea..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="rounded-full border-pink-200"
                  />
                  <Button
                    type="submit"
                    size="icon"
                    className="rounded-full bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 transition-all"
                  >
                    <Send size={18} className="text-white" />
                  </Button>
                </form>

                <div className="max-h-[600px] overflow-y-auto">
                  {comments.map((comment) => (
                    <div key={comment.id} className="border-b border-pink-100">
                      {/* Main comment */}
                      <div className="p-4 hover:bg-pink-50/30 transition-colors">
                        <div className="flex gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={comment.avatar} alt={comment.user} />
                            <AvatarFallback>{comment.user[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <div className="flex items-center">
                                <span className="font-semibold text-sm">{comment.user}</span>
                                {comment.user === "shilpi" && (
                                  <span className="ml-1 bg-yellow-100 text-yellow-700 text-xs px-2 py-0.5 rounded-full flex items-center">
                                    <Crown className="h-3 w-3 mr-1 text-yellow-500" fill="#FFD700" />
                                    Cutest
                                  </span>
                                )}
                                <span className="text-xs text-gray-500 ml-2">{comment.time}</span>
                              </div>
                              <Button variant="ghost" size="icon" className="h-6 w-6">
                                <MoreHorizontal size={14} />
                              </Button>
                            </div>
                            <p className="text-sm mt-1">{comment.content}</p>
                            <div className="flex gap-4 mt-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 text-xs text-gray-500 hover:text-pink-500"
                                onClick={() => handleLike(comment.id)}
                              >
                                <Heart
                                  className="h-3 w-3 mr-1"
                                  fill={comment.isLiked ? "#FFB6C1" : "none"}
                                  color={comment.isLiked ? "#FFB6C1" : "currentColor"}
                                />
                                {comment.likes > 0 && comment.likes}
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 text-xs text-gray-500 hover:text-blue-500"
                                onClick={() => handleReply(comment.id)}
                              >
                                Reply
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Reply form */}
                      {replyingTo === comment.id && (
                        <div className="pl-12 pr-4 pb-3 bg-blue-50/30">
                          <div className="flex gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Your avatar" />
                              <AvatarFallback>You</AvatarFallback>
                            </Avatar>
                            <Input
                              placeholder={`Reply to ${comment.user}...`}
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                              className="rounded-full border-blue-200 text-xs h-8"
                              autoFocus
                            />
                            <Button
                              size="sm"
                              className="h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 text-white"
                              onClick={() => handleSubmitReply(comment.id)}
                            >
                              Reply
                            </Button>
                          </div>
                        </div>
                      )}

                      {/* Replies */}
                      {comment.replies.length > 0 && (
                        <div className="pl-12 pr-4 pb-2 bg-gray-50/50">
                          {comment.replies.map((reply) => (
                            <div key={reply.id} className="py-3 border-t border-gray-100">
                              <div className="flex gap-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage src={reply.avatar} alt={reply.user} />
                                  <AvatarFallback>{reply.user[0]}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <span className="font-semibold text-xs">{reply.user}</span>
                                      <span className="text-xs text-gray-500 ml-2">{reply.time}</span>
                                    </div>
                                  </div>
                                  <p className="text-xs mt-1">{reply.content}</p>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-5 text-xs text-gray-500 hover:text-pink-500 mt-1 p-0"
                                    onClick={() => handleLike(reply.id, true, comment.id)}
                                  >
                                    <Heart
                                      className="h-3 w-3 mr-1"
                                      fill={reply.isLiked ? "#FFB6C1" : "none"}
                                      color={reply.isLiked ? "#FFB6C1" : "currentColor"}
                                    />
                                    {reply.likes > 0 && reply.likes}
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="bg-gradient-to-r from-pink-100 to-purple-100 p-3 text-center text-xs text-gray-500">
                <p className="w-full">End of comments • Keep the tea hot but friendly! 🔥</p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>

      <footer className="bg-gradient-to-r from-[#FF9999] to-[#FFBFA9] text-white p-4 mt-12">
        <div className="container mx-auto text-center text-sm">
          <p>Campus Whispers © {new Date().getFullYear()} • Spreading cute gossip since forever 💕</p>
          <div className="flex justify-center gap-4 mt-2">
            <a href="#" className="hover:underline">
              Terms
            </a>
            <a href="#" className="hover:underline">
              Privacy
            </a>
            <a href="#" className="hover:underline">
              Contact
            </a>
          </div>
        </div>
      </footer>

      {/* CSS for animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.1); opacity: 0.8; }
        }
      `}</style>
    </div>
  )
}

