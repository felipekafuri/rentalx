import { AppError } from '@errors/AppError'
import { ICarsImagesRepository } from '@modules/cars/repositories/ICarsImagesRepository'
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository'
import { IStorageProvider } from '@shared/container/providers/SotrageProvider/IStorageProvider'
import { inject, injectable } from 'tsyringe'

interface IRequest {
  car_id: string
  images_name: string[]
}

@injectable()
class UploadCarImagesUseCase {
  constructor(
    @inject('CarsImagesRepository')
    private carsImagesRepository: ICarsImagesRepository,

    @inject('CarsRepository')
    private carsRepository: ICarsRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {}

  async execute({ car_id, images_name }: IRequest): Promise<void> {
    const car = await this.carsRepository.findById(car_id)
    if (!car) {
      throw new AppError('Car does not exists')
    }

    images_name.map(async image => {
      await this.carsImagesRepository.create(car_id, image)
      await this.storageProvider.save(image, 'cars')
    })
  }
}

export { UploadCarImagesUseCase }
