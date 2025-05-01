import { type NextRequest, NextResponse } from "next/server"

// Simulação de um banco de dados (em produção, use um banco de dados real)
// Esta é apenas uma referência - os tickets são armazenados no arquivo route.ts principal
const tickets: any[] = []

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const query = searchParams.get("q")?.toLowerCase() || ""

        if (!query) {
            return NextResponse.json({ error: "Parâmetro de busca 'q' é obrigatório" }, { status: 400 })
        }

        // Busca tickets que correspondem à consulta
        const results = tickets.filter(
            (ticket) =>
                ticket.title.toLowerCase().includes(query) ||
                ticket.description.toLowerCase().includes(query) ||
                ticket.requesterName.toLowerCase().includes(query) ||
                ticket.requesterEmail.toLowerCase().includes(query),
        )

        return NextResponse.json(results)
    } catch (error) {
        console.error("Erro na busca de tickets:", error)
        return NextResponse.json({ error: "Erro ao processar a solicitação" }, { status: 500 })
    }
}
