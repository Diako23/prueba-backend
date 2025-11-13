import 'reflect-metadata';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductsService } from '../src/products/products.service';
import { Product } from '../src/products/product.entity';

function createRepoMock<T>() {
  return {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
  } as unknown as jest.Mocked<Repository<T>>;
}

describe('ProductsService', () => {
  let service: ProductsService;
  let repo: jest.Mocked<Repository<Product>>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        ProductsService,
        { provide: getRepositoryToken(Product), useValue: createRepoMock<Product>() },
      ],
    }).compile();

    service = moduleRef.get(ProductsService);
    repo = moduleRef.get(getRepositoryToken(Product));
  });

  it('creates a product', async () => {
    const dto = { nombre: 'A', precio: 10.5, stock: 3 };
    const created = { id: 'uuid', ...dto } as Product;
    (repo.create as any).mockReturnValue(created);
    (repo.save as any).mockResolvedValue(created);

    const result = await service.create(dto as any);
    expect(repo.create).toHaveBeenCalledWith(dto);
    expect(repo.save).toHaveBeenCalledWith(created);
    expect(result).toEqual(created);
  });

  it('finds all products', async () => {
    const list = [{ id: '1' } as Product];
    (repo.find as any).mockResolvedValue(list);
    expect(await service.findAll()).toBe(list);
  });

  it('throws on findOne when not found', async () => {
    (repo.findOne as any).mockResolvedValue(null);
    await expect(service.findOne('nope')).rejects.toThrow('Producto no encontrado');
  });

  it('updates a product', async () => {
    const existing = { id: 'u1', nombre: 'N', precio: 1, stock: 1 } as Product;
    (repo.findOne as any).mockResolvedValue(existing);
    (repo.save as any).mockImplementation(async (x: any) => x);

    const result = await service.update('u1', { precio: 2 } as any);
    expect(result.precio).toBe(2);
  });

  it('removes a product', async () => {
    (repo.delete as any).mockResolvedValue({ affected: 1 });
    await expect(service.remove('id')).resolves.toBeUndefined();
  });
});
