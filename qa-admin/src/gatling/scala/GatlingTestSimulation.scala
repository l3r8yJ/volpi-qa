// required for Gatling core structure DSL
import io.gatling.core.Predef._
import io.gatling.javaapi.core.PauseType
import jodd.util.RandomString

import scala.util.Random

// required for Gatling HTTP DSL
import io.gatling.http.Predef._

// can be omitted if you don't use jdbcFeeder
import io.gatling.jdbc.Predef._

// used for specifying durations with a unit, eg "5 minutes"
import scala.concurrent.duration._

class GatlingTestSimulation extends Simulation {
  private val api = "http://127.0.0.1:8080/api/v1"
  private val all_categories = scenario("All categories")
    .exec(
      http("categories")
        .get(api + "/categories")
        .check(status is 200)
    )
  private val put_category = scenario("Creates category")
    .exec(
      http("put category")
        .put(api + "/categories")
        .asJson
        .body(StringBody(s"""{ "name": "${Random.alphanumeric.take(5)}"}"""))
        .check(status is 409)
    )
  setUp(
    all_categories.inject(atOnceUsers(3000)),
  )
}
