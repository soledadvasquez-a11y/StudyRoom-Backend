import "dotenv/config";
import { SupabaseUserRepository } from "../infrastructure/repositories/SupabaseUserRepository";
import { RegisterUser } from "../application/use-cases/RegisterUser";

async function main() {
  const userRepository = new SupabaseUserRepository();
  const registerUseCase = new RegisterUser(userRepository);

  try {
    const admin = await registerUseCase.execute(
      "admin@gmail.com",
      "admin",
      "123456",
    );

    console.log("Admin created successfully:", admin);
  } catch (err: any) {
    console.error("Unable to create admin:", err.message);
    process.exit(1);
  }
}

main();
