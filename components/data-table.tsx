"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search } from "lucide-react"

interface IPCAData {
  D1C: string
  D1N: string
  D2C: string
  D2N: string
  D3C: string
  D3N: string
  V: string
}

interface DataTableProps {
  data: IPCAData[]
}

export function DataTable({ data }: DataTableProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredData = data
    .filter(
      (item) =>
        item.D1N.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.D2N.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .slice(0, 50)

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Buscar por grupo ou período..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Grupo</TableHead>
              <TableHead>Período</TableHead>
              <TableHead>Variável</TableHead>
              <TableHead className="text-right">Valor (%)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{item.D1N}</TableCell>
                <TableCell>
                  <Badge variant="outline">{item.D2N}</Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">{item.D3N}</TableCell>
                <TableCell className="text-right">
                  <span
                    className={`font-medium ${
                      Number.parseFloat(item.V) > 0
                        ? "text-destructive"
                        : Number.parseFloat(item.V) < 0
                          ? "text-green-600"
                          : "text-muted-foreground"
                    }`}
                  >
                    {Number.parseFloat(item.V) > 0 ? "+" : ""}
                    {item.V}%
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {filteredData.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">Nenhum resultado encontrado para "{searchTerm}"</div>
      )}

      {data.length > 50 && (
        <div className="text-sm text-muted-foreground text-center">
          Mostrando primeiros 50 resultados de {data.length} total
        </div>
      )}
    </div>
  )
}
