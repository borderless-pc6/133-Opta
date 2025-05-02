"use client"

import React, { useState, useEffect } from "react"
import "./FilaPage.css"

interface FilaPageProps {
    username: string
    onHomePage: () => void
    onLogout: () => void
}

interface QueueItem {
    id: string
    name: string
    status: "waiting" | "in-progress" | "completed"
    createdAt: number
}

type ModalMode = "add" | "edit" | null

const FILA_STORAGE_KEY = "filasGlobais"
const FILA_ID = "fila-principal"

// Leitura única da fila ao carregar o módulo
const savedFilas = JSON.parse(localStorage.getItem(FILA_STORAGE_KEY) || "{}")
const filaPrincipal: QueueItem[] = savedFilas[FILA_ID] || []

const FilaPage: React.FC<FilaPageProps> = ({ onHomePage, onLogout }) => {
    const [queueItems, setQueueItems] = useState<QueueItem[]>(filaPrincipal)
    const [modalOpen, setModalOpen] = useState(false)
    const [modalMode, setModalMode] = useState<ModalMode>(null)
    const [currentItem, setCurrentItem] = useState<QueueItem | null>(null)
    const [nameInput, setNameInput] = useState("")

    // Salvar fila no localStorage sempre que mudar
    useEffect(() => {
        const loadFilas = () => {
            const saved = localStorage.getItem(FILA_STORAGE_KEY)
            const filas = saved ? JSON.parse(saved) : {}
            setQueueItems(filas[FILA_ID] || [])
        }

        loadFilas()

        // Ouça quando a aba recebe foco
        window.addEventListener("focus", loadFilas)
        return () => window.removeEventListener("focus", loadFilas)
    }, [])



    const openModal = (mode: ModalMode, item?: QueueItem) => {
        setModalMode(mode)
        setCurrentItem(item ?? null)
        setNameInput(item?.name ?? "")
        setModalOpen(true)
    }

    const closeModal = () => {
        setModalOpen(false)
        setModalMode(null)
        setNameInput("")
        setCurrentItem(null)
    }

    const handleSubmit = () => {
        if (nameInput.trim() === "") return

        if (modalMode === "add") {
            const nextId =
                queueItems.length > 0
                    ? (
                        Math.max(...queueItems.map((item) => parseInt(item.id))) + 1
                    ).toString()
                    : "0"

            const newItem: QueueItem = {
                id: nextId,
                name: nameInput,
                status: "waiting",
                createdAt: Date.now()
            }
            setQueueItems(prev => [...prev, newItem])
        } else if (modalMode === "edit" && currentItem) {
            setQueueItems(prev =>
                prev.map(item =>
                    item.id === currentItem.id ? { ...item, name: nameInput } : item
                )
            )
        }

        closeModal()
    }

    const handleDeleteItem = (id: string) => {
        if (confirm("Deseja remover este item?")) {
            setQueueItems(prev => prev.filter(item => item.id !== id))
        }
    }

    const handleChangeStatus = (id: string) => {
        setQueueItems(prev =>
            prev.map(item =>
                item.id === id
                    ? {
                        ...item,
                        status:
                            item.status === "waiting"
                                ? "in-progress"
                                : item.status === "in-progress"
                                    ? "completed"
                                    : "waiting"
                    }
                    : item
            )
        )
    }

    const calculateWaitTime = (createdAt: number) => {
        return Math.floor((Date.now() - createdAt) / 60000)
    }

    return (
        <div className="fila-container">
            <header className="fila-header">
                <h1>Sistema de Fila</h1>
                <div className="user-controls">
                    <button onClick={onHomePage}>Início</button>
                    <button onClick={onLogout}>Sair</button>
                </div>
            </header>

            <main className="fila-content">
                <div className="fila-controls">
                    <h2>Gerenciamento de Fila</h2>
                    <button className="add-button" onClick={() => openModal("add")}>
                        Adicionar à Fila
                    </button>
                </div>

                <div className="queue-table-container">
                    <table className="queue-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Status</th>
                                <th>Tempo de Espera</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {queueItems.map((item) => (
                                <tr key={item.id} className={`status-${item.status}`}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>
                                        {item.status === "waiting"
                                            ? "Aguardando"
                                            : item.status === "in-progress"
                                                ? "Em Atendimento"
                                                : "Concluído"}
                                    </td>
                                    <td>{calculateWaitTime(item.createdAt)} min</td>
                                    <td className="actions">
                                        <button onClick={() => openModal("edit", item)}>✏️</button>
                                        <button onClick={() => handleDeleteItem(item.id)}>🗑️</button>
                                        <button onClick={() => handleChangeStatus(item.id)}>🔄</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>

            <footer className="fila-footer">
                <div className="version">Versão v1.0.0</div>
            </footer>

            {modalOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>{modalMode === "add" ? "Adicionar à Fila" : "Editar Nome"}</h3>
                        <input
                            type="text"
                            value={nameInput}
                            onChange={(e) => setNameInput(e.target.value)}
                            placeholder="Digite o nome"
                        />
                        <div className="modal-buttons">
                            <button onClick={handleSubmit}>Salvar</button>
                            <button onClick={closeModal}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default FilaPage
