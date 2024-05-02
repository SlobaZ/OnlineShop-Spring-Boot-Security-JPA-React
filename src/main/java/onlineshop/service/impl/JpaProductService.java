package onlineshop.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import onlineshop.models.Category;
import onlineshop.models.Product;
import onlineshop.repository.ProductRepository;
import onlineshop.service.ProductService;
import onlineshop.utils.AssignCategory;


@Service 
public class JpaProductService implements ProductService{
		
	@Autowired
	private ProductRepository productRepository;
	
	AssignCategory ac = new AssignCategory();

	@Override
	public Product getReferenceById(Integer id) {
		return productRepository.getReferenceById(id);
	}

	@Override
	public List<Product> findAll() {
		return productRepository.findAll();
	}

	@Override
	public Page<Product> findAll(int pageNum) {
		PageRequest pageable = PageRequest.of(pageNum, 10);
		return productRepository.findAll(pageable);
	}

	@Override
	public Product save(Product product) {
		ac.assign(product);
		return productRepository.save(product);
	}
	
	@Override
	public List<Product> saveAll(List<Product> products) {
		return productRepository.saveAll(products); 
	}


	@Override
	public Product delete(Integer id) {
		Product product = productRepository.getReferenceById(id);
		if(product != null) {
			productRepository.delete(product);
		}
		return product;
	}

	@Override
	public Page<Product> search(String name, String brand, Category category, Double price, int pageNum) {
		if( name != null) {
			name = '%' + name + '%';
		}
		if( brand != null) {
			brand = '%' + brand + '%';
		}
		PageRequest pageable = PageRequest.of(pageNum, 10);
		return productRepository.search(name, brand, category, price, pageable);
	}

	@Override
	public Product findByNameAndBrand(String name, String brand) {
		return productRepository.findByNameAndBrand(name, brand);
	}



}
