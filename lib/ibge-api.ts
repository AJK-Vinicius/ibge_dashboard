export interface IPCAData {
  D1C: string
  D1N: string
  D2C: string
  D2N: string
  D3C: string
  D3N: string
  D4C: string
  D4N: string
  V: string
}

export interface EconomicIndicator {
  id: string
  nome: string
  agregados: Array<{
    id: number
    nome: string
  }>
}

// indicadores econômicos
const ECONOMIC_INDICATORS_URL = "https://servicodados.ibge.gov.br/api/v3/agregados"

// IPCA de 2019
const SIDRA_IPCA_URL =
  "https://apisidra.ibge.gov.br/values/t/1419/n1/all/v/63/p/201901-201912/c315/7169,7170,7445,7486,7558,7625,7660,7712,7766,7786"

export async function fetchEconomicIndicators(): Promise<EconomicIndicator[]> {
  try {
    const response = await fetch(ECONOMIC_INDICATORS_URL, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    
    const allIndicators = Array.isArray(data) ? data : []
    
    // Filtra indicadores econômicos relevantes
    const economicIndicatorIds = ['IR', 'PC', 'IA', 'IQ', 'LA', 'PZ', 'MC', 'SC', 'SI']
    
    const filteredIndicators = allIndicators.filter((indicator: any) => 
      economicIndicatorIds.includes(indicator.id)
    )
    
    // Transforma dados para formato mais limpo
    return filteredIndicators.map((indicator: any) => ({
      id: indicator.id,
      nome: indicator.nome,
      agregados: Array.isArray(indicator.agregados) ? indicator.agregados : []
    }))
  } catch (error) {
    console.error("Error fetching Economic Indicators:", error)
    throw error
  }
}

export async function fetchIPCAData(): Promise<IPCAData[]> {
  try {
    const response = await fetch(SIDRA_IPCA_URL, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return transformSidraData(data)
  } catch (error) {
    console.error("Error fetching IPCA data:", error)
    throw error
  }
}

function transformSidraData(rawData: any[]): IPCAData[] {
  try {
    if (!Array.isArray(rawData) || rawData.length < 2) {
      return []
    }

    const headers = rawData[0]
    const dataRows = rawData.slice(1)

    const transformed = dataRows.map((row: any) => ({
      D1C: String(row.D1C || ""),
      D1N: String(row.D1N || ""),
      D2C: String(row.D2C || ""),
      D2N: String(row.D2N || ""),
      D3C: String(row.D3C || ""),
      D3N: String(row.D3N || ""),
      D4C: String(row.D4C || ""),
      D4N: String(row.D4N || ""),
      V: String(row.V || "0"),
    }))

    // Filtra apenas dados de variação mensal
    const variationData = transformed.filter(item => 
      item.D2N.includes("Variação mensal") || item.D2N.includes("IPCA - Variação mensal")
    )

    // Ordena por período mais recente primeiro
    return variationData.sort((a, b) => {
      // Converte período para comparação (formato: YYYYMM)
      const periodA = a.D3N.replace(/\D/g, '')
      const periodB = b.D3N.replace(/\D/g, '')
      return periodB.localeCompare(periodA)
    })
  } catch (error) {
    console.error("Error transforming SIDRA data:", error)
    return []
  }
}