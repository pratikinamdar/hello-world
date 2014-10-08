package hello



import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.SpringApplication;
import org.springframework.context.annotation.ComponentScan;

@ComponentScan
@EnableAutoConfiguration
class Application {

  def main(args: Array[String]) {
    SpringApplication.run(classOf[Application]);
  }
}
