import { ICarsImagesRepository } from '@modules/cars/repositories/ICarsImagesRepository'
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository'
import { deleteFile } from '@utils/file'
import { inject, injectable } from 'tsyringe'

interface IRequestDTO {
  car_id: string
  images_name: string[]
}

@injectable()
class UploadCarImagesUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,

    @inject('CarsImagesRepository')
    private carsImagesRepository: ICarsImagesRepository
  ) {}

  async execute({ car_id, images_name }: IRequestDTO): Promise<void> {
    images_name.map(async image => {
      await this.carsImagesRepository.create(car_id, image)
    })
    images_name.map(async image => {
      await deleteFile(`./tmp/cars/${image}`)
    })
  }
}

export { UploadCarImagesUseCase }
