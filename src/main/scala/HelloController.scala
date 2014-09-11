import org.springframework.boot.*;
import org.springframework.boot.autoconfigure.*;
import org.springframework.stereotype.*;
import org.springframework.web.bind.annotation.*;

@Controller
@EnableAutoConfiguration
class HelloController {

	@Request Mapping("/")
	def home() = "This is scala"

	}

object HelloController {
	def main(args: Array[String]) {
	SpringApplication.run(classof[HelloController]);
	}
}

