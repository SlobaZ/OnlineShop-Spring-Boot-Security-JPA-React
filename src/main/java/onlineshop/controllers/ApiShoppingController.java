package onlineshop.controllers;


import java.util.List;

import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import onlineshop.models.Shopping;
import onlineshop.models.Product;
import onlineshop.models.Item;
import onlineshop.models.User;
import onlineshop.service.ShoppingService;
import onlineshop.service.ProductService;
import onlineshop.service.ItemService;
import onlineshop.service.UserService;
import onlineshop.support.ShoppingDTOToShopping;
import onlineshop.support.ShoppingToShoppingDTO;
import onlineshop.utils.AuxiliaryClass;
import onlineshop.dto.ShoppingDTO;

@CrossOrigin(origins="http://localhost:3000")
@RestController
@RequestMapping(value="/api/shoppings")
public class ApiShoppingController {
	
	@Autowired
	private ShoppingService shoppingService;
	
	@Autowired
	private ShoppingToShoppingDTO toDTO;
	
	@Autowired
	private ShoppingDTOToShopping toShopping;
	 	
	@Autowired
	private UserService userService;
	
	@Autowired
	private ProductService productService;
	
	@Autowired
	private ItemService itemService;

		

	@GetMapping()
	@PreAuthorize("hasRole('ADMIN')")
	ResponseEntity<List<ShoppingDTO>> getAllShoppings(
			@RequestParam(required=false) Long userId, 
			@RequestParam(required=false) String code, 
			@RequestParam(required=false) Double totalPrice, 
			@RequestParam(required=false) String dateTimeBeginning,
			@RequestParam(required=false) String dateTimeEnd, 
			@RequestParam(value="pageNum", defaultValue="0") int pageNum){
		
		Page<Shopping> shoppingPage = null;
		
		if(userId!=null || code!=null || totalPrice!=null || dateTimeBeginning!=null || dateTimeEnd!=null) {
			shoppingPage = shoppingService.search(userId,code,totalPrice,dateTimeBeginning,dateTimeEnd,pageNum);
		}
		else {
			shoppingPage = shoppingService.findAll(pageNum);
		}

		HttpHeaders headers = new HttpHeaders();
		headers.add("totalPages", Integer.toString(shoppingPage.getTotalPages()) );
		
		return new ResponseEntity<>( toDTO.convert(shoppingPage.getContent()) , headers , HttpStatus.OK);
	}

	
	
	
	
	@GetMapping("/{id}")
	@PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
	ResponseEntity<ShoppingDTO> getShoppingById(@PathVariable Integer id){
		Shopping shopping = shoppingService.getReferenceById(id);
		if(shopping==null){
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<>( toDTO.convert(shopping), HttpStatus.OK);
	}
	
	
	
	@DeleteMapping("/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	ResponseEntity<ShoppingDTO> deleteShopping(@PathVariable Integer id){
		Shopping deleted = shoppingService.delete(id);
		
		if(deleted == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<>( toDTO.convert(deleted), HttpStatus.OK);
	}
		
	
	@PutMapping(value="/{id}" , consumes = "application/json")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<ShoppingDTO> editShopping(@PathVariable Integer id , @Valid @RequestBody ShoppingDTO shoppingDTO ){
		
		try {
			if(shoppingDTO==null){
				return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
			}
			shoppingDTO.setId(id);
			Shopping persisted = shoppingService.save(toShopping.convert(shoppingDTO));
			return new ResponseEntity<>(toDTO.convert(persisted),HttpStatus.OK);
		}
		catch (Exception e) {
				return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
		
	}
	
	
	
	@ExceptionHandler(value=DataIntegrityViolationException.class)
	public ResponseEntity<Void> handle() {
		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	}
	

	
	@PostMapping()
	@PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
	public ResponseEntity<ShoppingDTO> createShopping(){ 
		try {		
			User userDetails = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			String username = String.valueOf ( userDetails.getUsername() );
			User user = userService.findbyUsername(username);
	
			Shopping shopping = new Shopping();
			shopping.setCode(AuxiliaryClass.AssignCode());
			shopping.setDateTimeT(AuxiliaryClass.EntriesPresentDateAndTimeSql());
			shopping.setDateTime(AuxiliaryClass.ConvertSqlDateAndTimeToString(AuxiliaryClass.EntriesPresentDateAndTimeSql()));
			shopping.setTotalPrice(0.0);
			shopping.setUser(user);
			shoppingService.save(shopping);
			
			List<Product> products = productService.findAll();
			for(Product product:products) {
				Item item = new Item();
				item.setItemQuantity(0);
				item.setItemPrice(0.0);
				item.setProduct(product);
				itemService.save(item);
				shopping.addItem(item);
			}
			shoppingService.save(shopping);
			return new ResponseEntity<>( toDTO.convert(shopping), HttpStatus.CREATED); 
		}
		catch (Exception e) {
				return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
	}
	
	
	
	
	@GetMapping(value="/{id}/buy")
	@PreAuthorize("hasRole('ADMIN') or hasRole('USER')")  
	public ResponseEntity<ShoppingDTO> buy( @PathVariable Integer id) {
		
		Shopping shopping = shoppingService.buy(id);
		if(shopping==null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>( toDTO.convert(shopping) , HttpStatus.CREATED);
	}
	
	
	

	

}
