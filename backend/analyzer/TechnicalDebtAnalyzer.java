import java.nio.file.*;
import java.util.*;
import com.google.gson.Gson;

public class TechnicalDebtAnalyzer {

    public static void main(String[] args) throws Exception {

        // Read input file
        String code = Files.readString(Path.of("InputCode.java"));

        List<String> issues = new ArrayList<>();

        if (code.contains("System.out.println")) {
            issues.add("Avoid System.out.println, use logging framework");
        }

        if (code.length() > 500) {
            issues.add("File is too large, consider refactoring");
        }

        // Output JSON
        Gson gson = new Gson();
        System.out.println(gson.toJson(issues));
    }
}
