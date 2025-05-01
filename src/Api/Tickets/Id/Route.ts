import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"

// Definição do schema para atualização de tickets
const updateTicketSchema = z.object({
    title: z.string().min(3, "O título deve ter pelo menos 3 caracteres").optional(),
    description: z.string().min(10, "A descrição deve ter pelo menos 10 caracteres").optional(),
    priority: z.enum(["baixa", "média", "alta"]).optional(),
    category: z.string().optional(),
    status: z.enum(["aberto", "em_andamento", "resolvido", "fechado"]).optional(),
    assignedTo: z.string().optional(),
    comments: z
        .array(
            z.object({
                text: z.string(),
                author: z.string(),
                timestamp: z.date(),
            }),
        )
        .optional(),
})

// Simulação de um banco de dados (em produção, use um banco de dados real)
// Esta é apenas uma referência - os tickets são armazenados no arquivo route.ts principal
const tickets: any[] = []

export async function GET(_request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id = params.id

        // Busca o ticket pelo ID
        const ticket = tickets.find((t) => t.id === id)

        if (!ticket) {
            return NextResponse.json({ error: "Ticket não encontrado" }, { status: 404 })
        }

        return NextResponse.json(ticket)
    } catch (error) {
        console.error("Erro ao buscar ticket:", error)
        return NextResponse.json({ error: "Erro ao processar a solicitação" }, { status: 500 })
    }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id = params.id
        const body = await request.json()

        // Validação dos dados recebidos
        const result = updateTicketSchema.safeParse(body)

        if (!result.success) {
            return NextResponse.json({ error: "Dados inválidos", details: result.error.format() }, { status: 400 })
        }

        // Busca o índice do ticket
        const ticketIndex = tickets.findIndex((t) => t.id === id)

        if (ticketIndex === -1) {
            return NextResponse.json({ error: "Ticket não encontrado" }, { status: 404 })
        }

        // Atualiza o ticket
        const updatedTicket = {
            ...tickets[ticketIndex],
            ...result.data,
            updatedAt: new Date(),
        }

        tickets[ticketIndex] = updatedTicket

        return NextResponse.json(updatedTicket)
    } catch (error) {
        console.error("Erro ao atualizar ticket:", error)
        return NextResponse.json({ error: "Erro ao processar a solicitação" }, { status: 500 })
    }
}

export async function DELETE(_request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id = params.id

        // Busca o índice do ticket
        const ticketIndex = tickets.findIndex((t) => t.id === id)

        if (ticketIndex === -1) {
            return NextResponse.json({ error: "Ticket não encontrado" }, { status: 404 })
        }

        // Remove o ticket
        tickets.splice(ticketIndex, 1)

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Erro ao excluir ticket:", error)
        return NextResponse.json({ error: "Erro ao processar a solicitação" }, { status: 500 })
    }
}
