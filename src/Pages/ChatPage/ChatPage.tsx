"use client"
import { useState, useEffect, useRef } from "react"
import "./ChatPage.css"
import { Send, Paperclip, Smile, Phone, Video, MoreVertical, Search, ArrowLeft } from 'lucide-react'
import HomePage from "../HomePage/HomePage"

interface Message {
  id: string
  text: string
  sender: "user" | "contact"
  timestamp: Date
  status: "sent" | "delivered" | "read"
}

interface Contact {
  id: string
  initials: string
  name: string
  unread: number
  online: boolean
  lastSeen?: string
  messages: Message[]
}

interface ChatPageProps {
  username: string;
  onHomePage: () => void;
  onLogout: () => void;
  onNavigateToChat: () => void;
}

const ChatPage: React.FC<ChatPageProps> = ({ username, onHomePage, onLogout }) => {
  const [message, setMessage] = useState("")
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: "jo1",
      initials: "JO",
      name: "João Silva",
      unread: 2,
      online: false,
      lastSeen: "Visto por último hoje às 10:30",
      messages: [
        {
          id: "m1",
          text: "Olá, tudo bem?",
          sender: "contact",
          timestamp: new Date(Date.now() - 3600000),
          status: "read"
        },
        {
          id: "m2",
          text: "Precisamos conversar sobre o projeto",
          sender: "contact",
          timestamp: new Date(Date.now() - 3500000),
          status: "read"
        }
      ]
    },
    {
      id: "ma1",
      initials: "MA",
      name: "Maria Oliveira",
      unread: 0,
      online: true,
      messages: [
        {
          id: "m3",
          text: "Bom dia! Como está o andamento do relatório?",
          sender: "contact",
          timestamp: new Date(Date.now() - 86400000),
          status: "read"
        },
        {
          id: "m4",
          text: "Está quase pronto, devo finalizar hoje à tarde",
          sender: "user",
          timestamp: new Date(Date.now() - 82800000),
          status: "read"
        },
        {
          id: "m5",
          text: "Ótimo! Aguardo o envio então",
          sender: "contact",
          timestamp: new Date(Date.now() - 79200000),
          status: "read"
        }
      ]
    },
    {
      id: "pe1",
      initials: "PE",
      name: "Pedro Santos",
      unread: 1,
      online: true,
      messages: [
        {
          id: "m6",
          text: "Você já revisou aqueles documentos?",
          sender: "contact",
          timestamp: new Date(Date.now() - 172800000),
          status: "read"
        },
        {
          id: "m7",
          text: "Ainda não, farei isso amanhã",
          sender: "user",
          timestamp: new Date(Date.now() - 169200000),
          status: "read"
        },
        {
          id: "m8",
          text: "Preciso deles com urgência!",
          sender: "contact",
          timestamp: new Date(Date.now() - 3600000),
          status: "delivered"
        }
      ]
    },
    {
      id: "ca1",
      initials: "CA",
      name: "Carlos Ferreira",
      unread: 0,
      online: false,
      lastSeen: "Visto por último ontem às 18:45",
      messages: []
    },
    {
      id: "an1",
      initials: "AN",
      name: "Ana Costa",
      unread: 0,
      online: false,
      lastSeen: "Visto por último há 3 dias",
      messages: []
    },
    {
      id: "lu1",
      initials: "LU",
      name: "Lucia Pereira",
      unread: 0,
      online: false,
      lastSeen: "Visto por último hoje às 08:15",
      messages: []
    },
    {
      id: "ra1",
      initials: "RA",
      name: "Rafael Souza",
      unread: 3,
      online: true,
      messages: [
        {
          id: "m9",
          text: "Ei, você viu o e-mail do cliente?",
          sender: "contact",
          timestamp: new Date(Date.now() - 7200000),
          status: "delivered"
        },
        {
          id: "m10",
          text: "Precisamos responder hoje",
          sender: "contact",
          timestamp: new Date(Date.now() - 7100000),
          status: "delivered"
        },
        {
          id: "m11",
          text: "Me avise quando puder",
          sender: "contact",
          timestamp: new Date(Date.now() - 7000000),
          status: "delivered"
        }
      ]
    },
    {
      id: "ju1",
      initials: "JU",
      name: "Julia Almeida",
      unread: 0,
      online: false,
      lastSeen: "Visto por último há 1 semana",
      messages: []
    },
    {
      id: "fe1",
      initials: "FE",
      name: "Felipe Martins",
      unread: 0,
      online: true,
      messages: []
    },
  ])

  const [activeContact, setActiveContact] = useState<Contact | null>(null)
  const [showHomePage, setShowHomePage] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [showContactList, setShowContactList] = useState(true)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const emojiPickerRef = useRef<HTMLDivElement>(null)

  // Detectar se é dispositivo móvel
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768)
      if (window.innerWidth <= 768) {
        setShowContactList(true)
      } else {
        setShowContactList(true)
      }
    }

    checkIfMobile()
    window.addEventListener('resize', checkIfMobile)

    return () => {
      window.removeEventListener('resize', checkIfMobile)
    }
  }, [])

  // Definir contato ativo inicial
  useEffect(() => {
    if (contacts.length > 0 && !activeContact) {
      setActiveContact(contacts[0])
    }
  }, [contacts, activeContact])

  // Rolar para a última mensagem quando mudar de contato ou enviar mensagem
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [activeContact?.messages])

  // Fechar emoji picker quando clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target as Node)) {
        setShowEmojiPicker(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim() && activeContact) {
      const newMessage: Message = {
        id: `msg-${Date.now()}`,
        text: message.trim(),
        sender: "user",
        timestamp: new Date(),
        status: "sent"
      }

      // Atualizar mensagens do contato ativo
      const updatedContacts = contacts.map(contact => {
        if (contact.id === activeContact.id) {
          return {
            ...contact,
            messages: [...contact.messages, newMessage]
          }
        }
        return contact
      })

      setContacts(updatedContacts)
      setActiveContact(prev => prev ? {
        ...prev,
        messages: [...prev.messages, newMessage]
      } : null)

      setMessage("")

      // Simular resposta automática após 1-3 segundos
      if (Math.random() > 0.3) {
        const delay = Math.floor(Math.random() * 2000) + 1000
        setTimeout(() => {
          const autoResponses = [
            "Ok, entendi!",
            "Vou verificar isso.",
            "Obrigado pela informação.",
            "Podemos conversar mais sobre isso depois?",
            "Vou responder em breve.",
            "Interessante, conte-me mais.",
            "Já estou trabalhando nisso."
          ]

          const responseIndex = Math.floor(Math.random() * autoResponses.length)
          const responseText = autoResponses[responseIndex]

          const responseMessage: Message = {
            id: `msg-${Date.now()}`,
            text: responseText,
            sender: "contact",
            timestamp: new Date(),
            status: "delivered"
          }

          const updatedContactsWithResponse = contacts.map(contact => {
            if (contact.id === activeContact.id) {
              return {
                ...contact,
                messages: [...contact.messages, responseMessage]
              }
            }
            return contact
          })

          setContacts(updatedContactsWithResponse)
          setActiveContact(prev => prev ? {
            ...prev,
            messages: [...prev.messages, responseMessage]
          } : null)
        }, delay)
      }
    }
  }

  const formatMessageTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const formatLastMessageTime = (date: Date) => {
    const now = new Date()
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))

    if (diffDays === 0) {
      return formatMessageTime(date)
    } else if (diffDays === 1) {
      return "Ontem"
    } else if (diffDays < 7) {
      const days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
      return days[date.getDay()]
    } else {
      return date.toLocaleDateString()
    }
  }

  const getLastMessage = (contact: Contact) => {
    if (contact.messages.length === 0) return null
    return contact.messages[contact.messages.length - 1]
  }

  const handleContactClick = (contact: Contact) => {
    // Marcar mensagens como lidas
    const updatedContacts = contacts.map(c => {
      if (c.id === contact.id) {
        return {
          ...c,
          unread: 0,
          messages: c.messages.map(msg => ({
            ...msg,
            status: msg.sender === "contact" ? "read" : msg.status
          }))
        }
      }
      return c
    })

    setContacts(updatedContacts)
    setActiveContact(contact)

    if (isMobile) {
      setShowContactList(false)
    }
  }

  const handleBackToContacts = () => {
    setShowContactList(true)
  }

  const emojis = ["😀", "😂", "😊", "❤️", "👍", "🙏", "🎉", "🔥", "✅", "⭐", "🤔", "😎"]

  const insertEmoji = (emoji: string) => {
    setMessage(prev => prev + emoji)
  }

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (showHomePage) {
    return (
      <HomePage
        username={username}
        onLogout={onLogout}
        onNavigateToChat={() => setShowHomePage(false)}
      />
    )
  }

  return (
    <div className="chat-container">
      {/* Botão para HomePage */}
      <button className="home-button" onClick={onHomePage}>
        1
      </button>

      {/* Lista de contatos (sidebar) */}
      {(showContactList || !isMobile) && (
        <div className="chat-sidebar">
          <div className="sidebar-header">
            <div className="user-profile">
              <div className="contact-avatar header-avatar">
                <span className="avatar-text">{username.slice(0, 2).toUpperCase()}</span>
              </div>
              <h3>{username}</h3>
            </div>
            <div className="sidebar-actions">
              <button className="icon-button" onClick={onHomePage}>
                <MoreVertical size={20} />
              </button>
            </div>
          </div>

          <div className="search-container">
            <div className="search-wrapper">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                placeholder="Pesquisar ou começar nova conversa"
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="contacts-list">
            {filteredContacts.map((contact) => (
              <div
                key={contact.id}
                className={`contact-item ${activeContact?.id === contact.id ? "active" : ""}`}
                onClick={() => handleContactClick(contact)}
              >
                <div className="contact-avatar">
                  {contact.online && <span className="online-indicator"></span>}
                  <span className="avatar-text">{contact.initials}</span>
                </div>
                <div className="contact-info">
                  <div className="contact-header">
                    <span className="contact-name">{contact.name}</span>
                    {getLastMessage(contact) && (
                      <span className="message-time">
                        {formatLastMessageTime(getLastMessage(contact)!.timestamp)}
                      </span>
                    )}
                  </div>
                  <div className="contact-last-message">
                    {getLastMessage(contact) ? (
                      <p className="last-message-text">
                        {getLastMessage(contact)!.sender === "user" && <span>Você: </span>}
                        {getLastMessage(contact)!.text.length > 40
                          ? getLastMessage(contact)!.text.substring(0, 40) + "..."
                          : getLastMessage(contact)!.text}
                      </p>
                    ) : (
                      <p className="last-message-text text-muted">Nenhuma mensagem</p>
                    )}
                  </div>
                </div>
                {contact.unread > 0 && <div className="unread-count">{contact.unread}</div>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Área principal do chat */}
      {activeContact && (!showContactList || !isMobile) && (
        <div className="chat-main">
          <div className="chat-header">
            {isMobile && (
              <button className="back-button" onClick={handleBackToContacts}>
                <ArrowLeft size={24} />
              </button>
            )}
            <div className="contact-avatar header-avatar">
              <span className="avatar-text">{activeContact.initials}</span>
              {activeContact.online && <span className="online-indicator header-indicator"></span>}
            </div>
            <div className="header-info">
              <div className="header-name">{activeContact.name}</div>
              <div className="header-status">
                {activeContact.online ? "Online" : activeContact.lastSeen || "Offline"}
              </div>
            </div>
            <div className="header-actions">
              <button className="icon-button">
                <Search size={20} />
              </button>
              <button className="icon-button">
                <Phone size={20} />
              </button>
              <button className="icon-button">
                <Video size={20} />
              </button>
              <button className="icon-button">
                <MoreVertical size={20} />
              </button>
            </div>
          </div>

          <div className="chat-messages">
            {activeContact.messages.length === 0 ? (
              <div className="no-messages">
                <p>Nenhuma mensagem ainda. Diga olá!</p>
              </div>
            ) : (
              activeContact.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`message ${msg.sender === "user" ? "message-out" : "message-in"}`}
                >
                  <div className="message-content">
                    <p>{msg.text}</p>
                    <div className="message-meta">
                      <span className="message-time">{formatMessageTime(msg.timestamp)}</span>
                      {msg.sender === "user" && (
                        <span className={`message-status ${msg.status}`}>
                          {msg.status === "sent" && "✓"}
                          {msg.status === "delivered" && "✓✓"}
                          {msg.status === "read" && "✓✓"}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          <form className="chat-input-container" onSubmit={handleSendMessage}>
            <div className="input-buttons-left">
              <button
                type="button"
                className="input-button emoji-button"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              >
                <Smile size={20} />
              </button>
              <button type="button" className="input-button attachment-button">
                <Paperclip size={20} />
              </button>
            </div>

            {showEmojiPicker && (
              <div className="emoji-picker" ref={emojiPickerRef}>
                {emojis.map((emoji, index) => (
                  <button
                    key={index}
                    type="button"
                    className="emoji-item"
                    onClick={() => insertEmoji(emoji)}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            )}

            <input
              type="text"
              className="message-input"
              placeholder="Digite uma mensagem"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <button type="submit" className="send-button" disabled={!message.trim()}>
              <Send size={20} />
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

export default ChatPage