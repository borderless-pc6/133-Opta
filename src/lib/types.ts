import { z } from "zod"

// Schema para validação de tickets
export const ticketSchema = z.object({
    title: z.string().min(3, "O título deve ter pelo menos 3 caracteres"),
    description: z.string().min(10, "A descrição deve ter pelo menos 10 caracteres"),
    priority: z.enum(["baixa", "média", "alta"]),
    category: z.string(),
    requesterName: z.string(),
    requesterEmail: z.string().email("Email inválido"),
    status: z.enum(["aberto", "em_andamento", "resolvido", "fechado"]).default("aberto"),
})

// Tipo do ticket baseado no schema
export type Ticket = z.infer<typeof ticketSchema>

// Tipo do ticket com campos adicionais
export type TicketWithMeta = Ticket & {
    id: string
    createdAt: Date
    updatedAt?: Date
    assignedTo?: string
    comments?: {
        text: string
        author: string
        timestamp: Date
    }[]
}
