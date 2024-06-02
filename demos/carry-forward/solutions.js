const solutions = {
  "5c74a4cdfa4fe30007a71e80": `def installable(package, dependencies):
    def installable_r(package):
        if package in pre:
            return False
        elif package not in post:
            pre.add(package)
    
            for neighbor in dependencies[package]:
                if not installable_r(neighbor):
                    return False
                    
            pre.remove(package)
            post.add(package)
    
        return True

    pre = set()
    post = set()
    return installable_r(package)`,
  "5c8b093e21d0760008f57e55": `def installable(package, dependencies):
    def installable_r(package, path):
        if package in pre:
            return False
        elif package not in post:
            pre.add(package)
    
            for neighbor in dependencies[package]:
                if not installable_r(neighbor, path):
                    return False
                    
            path.append(package)
            pre.remove(package)
            post.add(package)
    
        return path

    pre = set()
    post = set()
    return installable_r(package, [])`,
  "5c8b0930d13fa3000b0b46c8": `def installable(package, dependencies):
    def installable_r(package, path):
        if package in pre:
            return False
        elif package not in post:
            pre.add(package)
    
            for neighbor in dependencies[package]:
                if not installable_r(neighbor, path):
                    return False
                    
            path.append(package)
            pre.remove(package)
            post.add(package)
    
        return path

    pre = set()
    post = set()
    return installable_r(package, [])

def valid_installation(sequence, package, dependencies):
    installed = set()
    
    for pkg in sequence:
        for dependency in dependencies[pkg]:
            if dependency not in installed:
                return False
        
        installed.add(pkg)
        
    ref = installable(package, dependencies)
    return set(ref).issubset(set(sequence))`,
};

