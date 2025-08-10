'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

interface ImageData {
  id: string
  url: string
  name: string
  folderName?: string
}

export function useSupabaseImages(bucketName: string, folderPath?: string) {
  const [images, setImages] = useState<ImageData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchImages() {
      try {
        setLoading(true)
        
        if (folderPath) {
          // Загружаем изображения из конкретной папки
          const { data: files, error: listError } = await supabase.storage
            .from(bucketName)
            .list(folderPath, { limit: 100 })

          if (listError) throw listError

          const imageUrls = files
            ?.filter(file => file.name.match(/\.(jpg|jpeg|png|gif|webp)$/i))
            .map(file => {
              const filePath = `${folderPath}/${file.name}`
              const { data } = supabase.storage
                .from(bucketName)
                .getPublicUrl(filePath)
              
              return {
                id: file.id || file.name,
                url: data.publicUrl,
                name: file.name,
                folderName: folderPath
              }
            }) || []

          setImages(imageUrls)
        } else {
          // Загружаем изображения из всех папок
          const allImages: ImageData[] = []
          
          // Список известных папок проектов
          const projectFolders = [
            'glavstroy', 'beregovoy', 'antiglyanec', 'tsum', 'start-dff', 
            'finflare', 'blueprint', 'mela', '1811', 'ostav', 'csum', 
            'csum-pokaz', '12Storeez'
          ]
          
          for (const folderName of projectFolders) {
            try {
              const { data: files, error: filesError } = await supabase.storage
                .from(bucketName)
                .list(folderName, { limit: 100 })

              if (filesError || !files) continue

              const folderImages = files
                .filter(file => file.name.match(/\.(jpg|jpeg|png|gif|webp)$/i))
                .map(file => {
                  const filePath = `${folderName}/${file.name}`
                  const { data } = supabase.storage
                    .from(bucketName)
                    .getPublicUrl(filePath)
                  
                  return {
                    id: `${folderName}/${file.name}`,
                    url: data.publicUrl,
                    name: file.name,
                    folderName: folderName
                  }
                })

              allImages.push(...folderImages)
            } catch (err) {
              // Игнорируем ошибки для отдельных папок
              continue
            }
          }

          setImages(allImages)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchImages()
  }, [bucketName, folderPath])

  return { images, loading, error }
}