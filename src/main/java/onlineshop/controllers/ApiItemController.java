package onlineshop.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import onlineshop.models.Item;
import onlineshop.service.ItemService;
import onlineshop.support.ItemDTOToItem;
import onlineshop.support.ItemToItemDTO;
import onlineshop.dto.ItemDTO;


@CrossOrigin(origins="http://localhost:3000")
@RestController
@RequestMapping(value="/api/shoppings/{shoppingId}/items")
public class ApiItemController {
	
	@Autowired
	private ItemService itemService;
	
	@Autowired
	private ItemToItemDTO toDTO;
	 
	@Autowired
	private ItemDTOToItem toItem;
		
	
	
	@GetMapping()
	@PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
	ResponseEntity<List<ItemDTO>> getAllsByShoppingId(@PathVariable Integer shoppingId) {
		List<Item> items = itemService.findByIdShopping(shoppingId);
	return new ResponseEntity<>( toDTO.convert(items) , HttpStatus.OK);
	}	

	
	
	
	@GetMapping("/{id}")
	@PreAuthorize("hasRole('ADMIN') or hasRole('USER')")  
	ResponseEntity<ItemDTO> getItemById(@PathVariable Integer id){
		Item item = itemService.getReferenceById(id);
		if(item==null){
			return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<>( toDTO.convert(item), HttpStatus.OK);
	}
	
	
	
	@DeleteMapping("/{id}")
	@PreAuthorize("hasRole('ADMIN') or hasRole('USER')")  
	ResponseEntity<ItemDTO> deleteItem(@PathVariable Integer id){
		Item deleted = itemService.delete(id);
		
		if(deleted == null) {
			return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<>( toDTO.convert(deleted), HttpStatus.OK);
	}
	
	
	@PostMapping(consumes = "application/json")
	@PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
	public ResponseEntity<ItemDTO> addItem( @Validated @RequestBody ItemDTO newItemDTO){
		if(newItemDTO==null) {
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}

		Item savedItem = itemService.save(toItem.convert(newItemDTO));
		
		return new ResponseEntity<>( toDTO.convert(savedItem), HttpStatus.CREATED);
	}

	
	
	@ExceptionHandler(value=DataIntegrityViolationException.class)
	public ResponseEntity<Void> handle() {
		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	}
	

	@GetMapping(value="/{id}/{itemQuantity}/buyItem")
	@PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
	public ResponseEntity<ItemDTO> buyItem(@PathVariable Integer id, @PathVariable int itemQuantity){

		Item item = itemService.buyItem(id,itemQuantity);
		if(item==null) {
			return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>( toDTO.convert(item), HttpStatus.CREATED);
	}
	
	
	@GetMapping(value="/{id}/resetItem")
	@PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
	public ResponseEntity<ItemDTO> resetItem(@PathVariable Integer id){

		Item item = itemService.resetItem(id);
		if(item==null) {
			return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>( toDTO.convert(item), HttpStatus.CREATED);
	}
	
	

}
