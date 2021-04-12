import { getRepository, Repository } from 'typeorm'

import { ICarsImagesRepository } from '@modules/cars/repositories/ICarsImagesRepository'

import { CarImage } from '../entities/CarImage'

class CarsImagesRepository implements ICarsImagesRepository {
  private ormRepository: Repository<CarImage>

  constructor() {
    this.ormRepository = getRepository(CarImage)
  }

  async create(car_id: string, image_name: string): Promise<CarImage> {
    const carImage = this.ormRepository.create({ car_id, image_name })

    await this.ormRepository.save(carImage)

    return carImage
  }
}

export { CarsImagesRepository }
